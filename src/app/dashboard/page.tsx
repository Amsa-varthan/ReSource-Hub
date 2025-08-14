'use client';

import Header from '@/components/header';
import ListingCard from '@/components/listing-card';
import { useAuth } from '@/context/auth-context';
import { useListings } from '@/context/listing-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { listings } = useListings();

  if (!user || user.role !== 'donor') {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              Please log in as a Donor to view this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const myActiveListings = listings.filter(
    (l) => l.donorId === user.id && l.status !== 'completed'
  );
  const myCompletedListings = listings.filter(
    (l) => l.donorId === user.id && l.status === 'completed'
  );

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">My Dashboard</h1>
            <Button asChild>
              <Link href="/listings/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Listing
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">
                Active Listings ({myActiveListings.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed Pickups ({myCompletedListings.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-6">
              {myActiveListings.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {myActiveListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-background p-12 text-center">
                  <h2 className="text-xl font-semibold">
                    You have no active listings.
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Click the button to create your first e-waste listing!
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/listings/new">Create a Listing</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              {myCompletedListings.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {myCompletedListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-background p-12 text-center">
                  <h2 className="text-xl font-semibold">No completed pickups yet.</h2>
                  <p className="mt-2 text-muted-foreground">
                    Your past pickups will appear here.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
