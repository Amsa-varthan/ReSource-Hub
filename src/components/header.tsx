'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from './ui/button';
import { useAuth } from '@/context/auth-context';
import type { UserRole } from '@/lib/types';
import Logo from './logo';
import { cn } from '@/lib/utils';
import { LayoutGrid, LayoutList, ShieldCheck } from 'lucide-react';

export default function Header() {
  const { user, login } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', role: 'donor', icon: <LayoutList/> },
    { href: '/marketplace', label: 'Marketplace', role: 'collector', icon: <LayoutGrid /> },
    { href: '/admin', label: 'Admin', role: 'admin', icon: <ShieldCheck /> },
  ];

  const handleRoleChange = (role: UserRole) => {
    login(role);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {user && user.role !== 'guest' &&
              navLinks
                .filter((link) => link.role === user.role)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-2 font-medium transition-colors hover:text-primary',
                      pathname === link.href
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-4">
             <div className="w-48">
                <Select onValueChange={handleRoleChange} value={user?.role}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guest">Guest</SelectItem>
                    <SelectItem value="donor">Household (Donor)</SelectItem>
                    <SelectItem value="collector">Business (Collector)</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
             </div>
            {user?.role === 'donor' && (
              <Button asChild>
                <Link href="/listings/new">Create Listing</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
