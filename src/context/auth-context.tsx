'use client';

import type { User, UserRole } from '@/lib/types';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { users } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_USER: User = { id: 'guest', name: 'Guest', role: 'guest' };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(GUEST_USER);

  const login = (role: UserRole) => {
    if (role === 'guest') {
      setUser(GUEST_USER);
      return;
    }
    const userToLogin = users.find((u) => u.role === role);
    setUser(userToLogin || GUEST_USER);
  };

  const logout = () => {
    setUser(GUEST_USER);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
