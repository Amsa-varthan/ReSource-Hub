'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/header';
import ListingCard from '@/components/listing-card';
import { useAuth } from '@/context/auth-context';
import { useListings } from '@/context/listing-context';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Laptop, Smartphone, Cable, Cpu, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Listing, ListingCategory } from '@/lib/types';

const categoryIcons: Record<ListingCategory, React.ReactNode> = {
    Laptops: <Laptop className="mr-2 h-4 w-4" />,
    Phones: <Smartphone className="mr-2 h-4 w-4" />,
    Cables: <Cable className="mr-2 h-4 w-4" />,
    Components: <Cpu className="mr-2 h-4 w-4" />,
    Other: <List className="mr-2 h-4 w-4" />,
};

export default function MarketplacePage() {
  const { user } = useAuth();
  const { listings } = useListings();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'all'>('all');


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

  const filteredAndSortedListings = useMemo(() => {
    let filtered = listings.filter(
      (l) => l.status === 'available' && l.city === user.city
    );

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(l => l.category === selectedCategory);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()) || l.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return filtered.sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortOrder === 'oldest') {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return 0;
    });
  }, [listings, user.city, searchTerm, sortOrder, selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-4">
            <h1 className="font-headline self-start text-3xl font-bold">
              Marketplace - {user.city}
            </h1>
            <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search listings..."
                  className="w-full rounded-lg bg-background pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="flex w-full flex-wrap gap-2 pt-2">
                <Button variant={selectedCategory === 'all' ? 'default' : 'outline'} onClick={() => setSelectedCategory('all')}>All Categories</Button>
                {(Object.keys(categoryIcons) as ListingCategory[]).map(cat => (
                    <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} onClick={() => setSelectedCategory(cat)}>
                        {categoryIcons[cat]} {cat}
                    </Button>
                ))}
             </div>
          </div>
          {filteredAndSortedListings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-background p-12 text-center">
                  <h2 className="text-xl font-semibold">
                    No available listings matching your criteria.
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your search or filters, or check back later for new e-waste listings near you.
                  </p>
                </div>
          )}
        </div>
      </main>
    </div>
  );
}
