'use client';

import { useState } from 'react';
import Header from '@/components/header';
import { useAuth } from '@/context/auth-context';
import { listings as allListings, users, messages as initialMessages } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HandCoins, MapPin, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [messages, setMessages] = useState(initialMessages.filter(m => m.listingId === params.id));
  const [newMessage, setNewMessage] = useState('');

  const listing = allListings.find((l) => l.id === params.id);

  if (!listing) {
    notFound();
  }
  
  const donor = users.find((u) => u.id === listing.donorId);
  const collector = users.find((u) => u.id === listing.collectorId);

  const canViewChat =
    user?.role === 'admin' ||
    (listing.status !== 'available' &&
      (user?.id === listing.donorId || user?.id === listing.collectorId));

  const handleSendMessage = () => {
      if(newMessage.trim() === '' || !user) return;
      const msg = {
          id: `msg-${Date.now()}`,
          listingId: listing.id,
          senderId: user.id,
          text: newMessage,
          timestamp: Date.now(),
      }
      setMessages([...messages, msg]);
      setNewMessage('');
  }
  
  const handleClaim = (cashback?: number) => {
    toast({
        title: 'Item Claimed!',
        description: `You have successfully claimed "${listing.title}".`
    })
    if(cashback) {
      console.log(`Offered $${cashback} cashback. 10% fee will be applied.`);
    }
    // Here you would typically update the listing status in the backend.
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to listings
          </Button>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {listing.images.map((img, index) => (
                        <CarouselItem key={index}>
                          <div className="relative aspect-video w-full">
                            <Image
                              src={img}
                              alt={`${listing.title} image ${index + 1}`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                              data-ai-hint="e-waste electronics"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <CardTitle className="font-headline text-2xl md:text-3xl">{listing.title}</CardTitle>
                    <Badge variant={listing.status === 'available' ? 'default' : 'secondary'}>{listing.status}</Badge>
                  </div>
                  <div className="mt-2 flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{listing.address}</span>
                  </div>
                  <Separator className="my-6" />
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="mt-2 text-muted-foreground">{listing.description}</p>

                  <Separator className="my-6" />
                   <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                     <p><strong>Donor:</strong> {donor?.name}</p>
                     <p><strong>Listed on:</strong> {new Date(listing.createdAt).toLocaleDateString()}</p>
                     {collector && <p><strong>Collector:</strong> {collector.name}</p>}
                     {listing.cashbackOffer && <p><strong>Cashback Offer:</strong> ${listing.cashbackOffer.toFixed(2)}</p>}
                   </div>

                </CardContent>
              </Card>
            </div>
            <div className="space-y-8 md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  {user?.role === 'collector' && listing.status === 'available' && (
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full">
                          <HandCoins className="mr-2 h-4 w-4" />
                          Claim Item
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Make a Cashback Offer (Optional)</AlertDialogTitle>
                          <AlertDialogDescription>
                            If this item has value, you can offer the donor a cashback amount. A 10% platform fee will be applied to this amount.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cashback-amount" className="text-right">Amount ($)</Label>
                            <Input id="cashback-amount" type="number" placeholder="e.g., 20.00" className="col-span-3"/>
                          </div>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                           <AlertDialogAction onClick={() => handleClaim()}>Claim without Offer</AlertDialogAction>
                          <AlertDialogAction onClick={() => handleClaim(20)}>Submit Offer & Claim</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {user?.id === listing.donorId && listing.status === 'claimed' && (
                     <Button className="w-full" variant="secondary">Mark as Picked Up</Button>
                  )}
                   {user?.id === listing.collectorId && listing.status === 'claimed' && (
                     <Button className="w-full" variant="secondary">Mark as Picked Up</Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pickup Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  {canViewChat ? (
                     <div className="flex h-[400px] flex-col">
                        <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                           {messages.map(msg => {
                               const sender = users.find(u => u.id === msg.senderId);
                               const isMe = user?.id === msg.senderId;
                               return (
                                <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : ''}`}>
                                   {!isMe && <Avatar className="h-8 w-8"><AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback></Avatar>}
                                   <div className={`max-w-xs rounded-lg p-3 ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                       <p className="text-sm">{msg.text}</p>
                                   </div>
                                    {isMe && <Avatar className="h-8 w-8"><AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback></Avatar>}
                                </div>
                               )
                           })}
                        </div>
                        <div className="mt-4 flex gap-2 pt-4 border-t">
                            <Input 
                                placeholder="Type a message..." 
                                value={newMessage} 
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button onClick={handleSendMessage}><Send className="h-4 w-4" /></Button>
                        </div>
                     </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <p>Chat is available after an item has been claimed by a collector.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
