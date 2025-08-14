'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { useAuth } from '@/context/auth-context';
import Logo from './logo';
import { cn } from '@/lib/utils';
import { LayoutGrid, LayoutList, LogOut, ShieldCheck, UserCircle } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', role: 'donor', icon: <LayoutList/> },
    { href: '/marketplace', label: 'Marketplace', role: 'collector', icon: <LayoutGrid /> },
    { href: '/admin', label: 'Admin', role: 'admin', icon: <ShieldCheck /> },
  ];

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
             {user && user.role !== 'guest' ? (
                <>
                  <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
                    Welcome, {user.name}
                  </span>
                  <Button variant="ghost" size="icon" onClick={logout}>
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </>
             ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
             )}
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
