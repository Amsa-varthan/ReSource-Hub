
'use client';

import type { User, UserRole } from '@/lib/types';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { users } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (role: UserRole) => void;
  logout: () => void;
  signup: (role: UserRole, name: string) => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_USER: User = { id: 'guest', name: 'Guest', role: 'guest' };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(GUEST_USER);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(GUEST_USER);
      }
    } catch (error) {
      setUser(GUEST_USER);
    } finally {
        setIsInitialized(true);
    }
  }, []);

  const login = (role: UserRole) => {
    let userToLogin: User | undefined;
    if (role === 'guest') {
      userToLogin = GUEST_USER;
    } else {
      userToLogin = users.find((u) => u.role === role);
    }
    
    if (userToLogin) {
      setUser(userToLogin);
      localStorage.setItem('user', JSON.stringify(userToLogin));
    }
  };

  const signup = (role: UserRole, name: string) => {
    const baseUser = users.find(u => u.role === role);
    if (!baseUser) return; 

    const newUser: User = {
      ...baseUser,
      id: `user-${Date.now()}`,
      name: name,
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };


  const logout = () => {
    setUser(GUEST_USER);
    localStorage.removeItem('user');
    router.push('/');
  };
  
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, signup, isInitialized }}>
      {isInitialized ? children : null}
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
