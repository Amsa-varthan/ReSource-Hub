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

export default function SignupPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = (role: 'donor' | 'collector') => {
    login(role);
    toast({
      title: 'Signup Successful',
      description: `Your account has been created as a ${role}.`,
    });
     if (role === 'donor') {
      router.push('/dashboard');
    } else if (role === 'collector') {
      router.push('/marketplace');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
        <Header />
        <div className="flex flex-1 items-center justify-center p-4">
          <Tabs defaultValue="donor" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="donor">Household (Donor)</TabsTrigger>
              <TabsTrigger value="collector">Business (Collector)</TabsTrigger>
            </TabsList>
            <TabsContent value="donor">
              <Card>
                <CardHeader>
                  <CardTitle>Create a Donor Account</CardTitle>
                  <CardDescription>
                    List your e-waste for collectors to pick up.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="donor-name">Full Name</Label>
                    <Input id="donor-name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donor-email">Email</Label>
                    <Input id="donor-email" type="email" placeholder="donor@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donor-password">Password</Label>
                    <Input id="donor-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full" onClick={() => handleSignup('donor')}>
                    Sign Up as a Donor
                  </Button>
                   <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                      Login
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="collector">
              <Card>
                <CardHeader>
                  <CardTitle>Register as a Collector</CardTitle>
                  <CardDescription>
                    Find and claim e-waste listings in your area.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="collector-name">Business Name</Label>
                        <Input id="collector-name" placeholder="ABC Recycling" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="collector-email">Business Email</Label>
                        <Input id="collector-email" type="email" placeholder="contact@abcrecycling.com"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="collector-password">Password</Label>
                        <Input id="collector-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" onClick={() => handleSignup('collector')}>
                        Register as a Collector
                    </Button>
                     <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                      Login
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
}
