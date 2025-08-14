export type UserRole = 'donor' | 'collector' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  city?: string;
}

export type ListingStatus = 'available' | 'claimed' | 'completed';
export type ListingCategory = 'Laptops' | 'Phones' | 'Cables' | 'Components' | 'Other';

export interface Listing {
  id: string;
  title: string;
  description: string;
  images: string[];
  status: ListingStatus;
  category: ListingCategory;
  donorId: string;
  collectorId?: string;
  city: string;
  address: string;
  cashbackOffer?: number;
  createdAt: string;
  completedAt?: string;
}

export type CollectorAppStatus = 'pending' | 'approved' | 'rejected';

export interface CollectorApplication {
  id:string;
  businessName: string;
  registrationNumber: string;
  certificationPdf: string;
  status: CollectorAppStatus;
  submittedAt: string;
}

export interface Message {
  id: string;
  listingId: string;
  senderId: string;
  text: string;
  timestamp: number;
}
