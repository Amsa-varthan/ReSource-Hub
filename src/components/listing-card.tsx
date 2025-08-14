import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin } from 'lucide-react';
import type { Listing } from '@/lib/types';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="relative h-48 w-full p-0">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint="e-waste electronics"
        />
        <Badge
          className="absolute right-2 top-2"
          variant={listing.status === 'available' ? 'default' : 'secondary'}
        >
          {listing.status}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 line-clamp-2 text-lg font-bold">
          {listing.title}
        </CardTitle>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {listing.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span className="truncate">{listing.address}</span>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/listings/${listing.id}`}>
            View <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
