'use client';

import type { Listing, Message } from '@/lib/types';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { listings as initialListings, messages as initialMessages } from '@/lib/data';

interface ListingsContextType {
  listings: Listing[];
  setListings: (listings: Listing[]) => void;
  addListing: (listing: Listing) => void;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  messages: Message[];
  addMessage: (message: Message) => void;
}

const ListingsContext = createContext<ListingsContextType | undefined>(
  undefined
);

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const addListing = (listing: Listing) => {
    setListings((prevListings) => [listing, ...prevListings]);
  };

  const updateListing = (id: string, updates: Partial<Listing>) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === id ? { ...listing, ...updates } : listing
      )
    );
  };
  
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  return (
    <ListingsContext.Provider
      value={{ listings, setListings, addListing, updateListing, messages, addMessage }}
    >
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
}
