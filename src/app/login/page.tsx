'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/header';
import type { UserRole } from '@/lib/types';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (role: UserRole) => {
    login(role);
    toast({
      title: 'Login Successful',
      description: `You have been logged in as a ${role}.`,
    });
    if (role === 'donor' || role === 'admin') {
      router.push('/dashboard');
    } else if (role === 'collector') {
      router.push('/marketplace');
    } else {
       router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Select your role to log in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="user@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
           <CardFooter className="flex flex-col gap-4">
             <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <Button onClick={() => handleLogin('donor')} className="w-full">
                  Login as Donor
                </Button>
                <Button onClick={() => handleLogin('collector')} className="w-full">
                  Login as Collector
                </Button>
             </div>
              <Button onClick={() => handleLogin('admin')} className="w-full" variant="outline">
                Login as Admin
              </Button>
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
