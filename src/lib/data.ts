import { User, Listing, CollectorApplication, Message } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Alice', role: 'donor', city: 'Metro City' },
  {
    id: 'user-2',
    name: 'Bobs Recycling',
    role: 'collector',
    city: 'Metro City',
  },
  { id: 'user-3', name: 'Charlie', role: 'donor', city: 'Metro City' },
  {
    id: 'user-4',
    name: 'Eco Services',
    role: 'collector',
    city: 'Metro City',
  },
  { id: 'user-admin', name: 'Admin', role: 'admin' },
];

export const listings: Listing[] = [
  {
    id: 'listing-1',
    title: 'Broken HP Laptop',
    description:
      'Mid-2015 HP Pavilion laptop. Screen is cracked and it does not power on. Might be useful for parts. Comes with a charger.',
    images: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    status: 'available',
    category: 'Laptops',
    donorId: 'user-1',
    city: 'Metro City',
    address: '123 Main St, Metro City',
    createdAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'listing-2',
    title: 'Old Samsung Smartphone',
    description:
      'An old Samsung Galaxy S8. The battery life is very poor, but it still works. No charger included.',
    images: ['https://placehold.co/600x400.png'],
    status: 'available',
    category: 'Phones',
    donorId: 'user-3',
    city: 'Metro City',
    address: '456 Oak Ave, Metro City',
    createdAt: '2023-10-25T14:30:00Z',
  },
  {
    id: 'listing-3',
    title: 'Collection of Old Wires and Cables',
    description:
      'A box full of various cables - USB, HDMI, power cords, etc. Take all or nothing.',
    images: ['https://placehold.co/600x400.png'],
    status: 'claimed',
    category: 'Cables',
    donorId: 'user-1',
    collectorId: 'user-2',
    city: 'Metro City',
    address: '123 Main St, Metro City',
    cashbackOffer: 5,
    createdAt: '2023-10-24T11:00:00Z',
  },
  {
    id: 'listing-4',
    title: 'Vintage Apple iMac G3',
    description:
      'A classic Bondi Blue iMac G3. It was working last time I checked a few years ago. A real collector-s item.',
    images: ['https://placehold.co/600x400.png'],
    status: 'completed',
    category: 'Other',
    donorId: 'user-3',
    collectorId: 'user-4',
    city: 'Metro City',
    address: '456 Oak Ave, Metro City',
    cashbackOffer: 50,
    createdAt: '2023-09-15T09:00:00Z',
    completedAt: '2023-09-18T16:00:00Z',
  },
    {
    id: 'listing-5',
    title: 'Box of PC Components',
    description:
      'Various PC components including RAM sticks, a few graphics cards (older models), and some motherboards. Condition unknown.',
    images: ['https://placehold.co/600x400.png'],
    status: 'available',
    category: 'Components',
    donorId: 'user-1',
    city: 'Metro City',
    address: '789 Pine St, Metro City',
    createdAt: '2023-10-27T18:00:00Z',
  },
];

export const applications: CollectorApplication[] = [
  {
    id: 'app-1',
    businessName: 'Green Tech Recyclers',
    registrationNumber: 'GT-12345',
    certificationPdf: '/path/to/cert1.pdf',
    status: 'pending',
    submittedAt: '2023-10-26T12:00:00Z',
  },
  {
    id: 'app-2',
    businessName: 'Circuit Savers',
    registrationNumber: 'CS-67890',
    certificationPdf: '/path/to/cert2.pdf',
    status: 'pending',
    submittedAt: '2023-10-25T15:00:00Z',
  },
  {
    id: 'app-3',
    businessName: 'Approved Recyclers Inc.',
    registrationNumber: 'AR-11223',
    certificationPdf: '/path/to/cert3.pdf',
    status: 'approved',
    submittedAt: '2023-10-20T10:00:00Z',
  },
];

export const messages: Message[] = [
    {
        id: 'msg-1',
        listingId: 'listing-3',
        senderId: 'user-2',
        text: 'Hi Alice, I-ve claimed your item. When is a good time to pick it up?',
        timestamp: Date.now() - 1000 * 60 * 5,
    },
    {
        id: 'msg-2',
        listingId: 'listing-3',
        senderId: 'user-1',
        text: 'Hi! How about tomorrow afternoon around 2 PM?',
        timestamp: Date.now() - 1000 * 60 * 4,
    },
    {
        id: 'msg-3',
        listingId: 'listing-3',
        senderId: 'user-2',
        text: 'Sounds great, see you then!',
        timestamp: Date.now() - 1000 * 60 * 3,
    }
]
