'use client';

import Header from '@/components/header';
import ListingCard from '@/components/listing-card';
import { useAuth } from '@/context/auth-context';
import { listings as allListings } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function MarketplacePage() {
  const { user } = useAuth();

  if (!user || user.role !== 'collector') {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              Please log in as a Collector to view this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const availableListings = allListings.filter(
    (l) => l.status === 'available' && l.city === user.city
  );

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <h1 className="font-headline text-3xl font-bold">
              Marketplace - {user.city}
            </h1>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search listings..."
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
          </div>
          {availableListings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {availableListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-background p-12 text-center">
                  <h2 className="text-xl font-semibold">
                    No available listings in your area.
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Check back later for new e-waste listings near you.
                  </p>
                </div>
          )}
        </div>
      </main>
    </div>
  );
}
