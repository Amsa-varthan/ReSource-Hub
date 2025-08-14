'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateListingDetails } from '@/ai/flows/generate-listing-details';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ImageUp, Loader, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useListings } from '@/context/listing-context';

const listingSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters.' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  address: z
    .string()
    .min(10, { message: 'Please enter a valid pickup address.' }),
});

type ListingFormValues = z.infer<typeof listingSchema>;

export default function NewListingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { addListing } = useListings();
  const [isPending, startTransition] = useTransition();
  const [photos, setPhotos] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      description: '',
      address: user?.city ? `${user.city}` : '',
    },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const dataUrls: string[] = [];
      let filesProcessed = 0;

      if (filesArray.length === 0) return;

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          if (loadEvent.target?.result) {
            dataUrls.push(loadEvent.target.result as string);
          }
          filesProcessed++;
          if (filesProcessed === filesArray.length) {
            setPhotos((prevPhotos) => [...prevPhotos, ...dataUrls]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleGenerateDetails = () => {
    if (photos.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Photos Uploaded',
        description: 'Please upload at least one photo to use the AI generator.',
      });
      return;
    }
    setIsGenerating(true);
    startTransition(async () => {
      try {
        const result = await generateListingDetails({ photoDataUris: photos });
        form.setValue('title', result.title);
        form.setValue('description', result.description);
      } catch (error) {
        console.error('AI Generation failed', error);
        toast({
          variant: 'destructive',
          title: 'AI Generation Failed',
          description:
            'Could not generate details. Please try again or write them manually.',
        });
      } finally {
        setIsGenerating(false);
      }
    });
  };

  function onSubmit(values: ListingFormValues) {
    if (!user) return;
    const newListing = {
      id: `listing-${Date.now()}`,
      ...values,
      images: photos.length > 0 ? photos : ['https://placehold.co/600x400.png'],
      status: 'available' as const,
      donorId: user.id,
      city: user.city || 'Unknown City',
      createdAt: new Date().toISOString(),
    };
    addListing(newListing);
    toast({
      title: 'Listing Created!',
      description:
        'Your e-waste listing has been successfully created. You will be redirected.',
    });
    router.push('/dashboard');
  }

  if (!user || user.role !== 'donor') {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center text-center">
          <div>
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              Please log in as a Donor to create a listing.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Create a New E-Waste Listing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <FormLabel>Photos</FormLabel>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={photo}
                            alt={`Uploaded photo ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                      ))}
                      <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-muted-foreground hover:border-primary hover:text-primary">
                        <ImageUp className="h-8 w-8" />
                        <span className="mt-2 text-sm">Upload</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={handlePhotoUpload}
                        />
                      </label>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateDetails}
                    disabled={photos.length === 0 || isPending || isGenerating}
                  >
                    {isGenerating || isPending ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Generate Details with AI
                  </Button>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Broken HP Laptop"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the item and its condition..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main St, Anytown, USA"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Create Listing
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
