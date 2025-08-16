'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Recycle,
  Smartphone,
  Laptop,
  MessageSquare,
  HandCoins,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/header';
import { useAuth } from '@/context/auth-context';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: <Recycle className="h-10 w-10 text-primary" />,
    title: 'Effortless Listing',
    description:
      'Quickly list your e-waste with our simple form. Our AI can even help you write the description!',
  },
  {
    icon: <HandCoins className="h-10 w-10 text-primary" />,
    title: 'Get Cashback',
    description:
      'Collectors can offer you cash for valuable items, turning your trash into treasure.',
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: 'Direct Communication',
    description:
      'Use our in-app chat to coordinate a seamless pickup with your chosen collector.',
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: 'Verified Collectors',
    description:
      'Rest easy knowing all our business users are verified for safe, responsible recycling.',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'List Your Item',
    description: 'Snap a photo, add a few details, and post your e-waste.',
  },
  {
    step: 2,
    title: 'Get Claimed',
    description: 'A local, verified collector claims your item for pickup.',
  },
  {
    step: 3,
    title: 'Coordinate Pickup',
    description: 'Chat with the collector to arrange a convenient time.',
  },
  {
    step: 4,
    title: 'Recycle Responsibly',
    description: 'Your e-waste is picked up and properly recycled. That-s it!',
  },
];

export default function LandingPage() {
  const { user } = useAuth();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);


  const getStartedLink =
    user?.role === 'donor'
      ? '/dashboard'
      : user?.role === 'collector'
        ? '/marketplace'
        : '/dashboard';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Give Your E-Waste a New Life
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground">
                  ReSource Hub connects you with local, verified recyclers to
                  dispose of your old electronics responsibly—and maybe even
                  earn some cash.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="font-semibold">
                    <Link href={getStartedLink}>
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute -left-10 top-0 h-48 w-48 animate-blob rounded-full bg-primary/20 opacity-50 blur-2xl filter"></div>
                <div className="animation-delay-2000 absolute -right-10 bottom-0 h-48 w-48 animate-blob rounded-full bg-accent/20 opacity-50 blur-2xl filter"></div>
                <div className="relative">
                  {/* SUGGESTION: Replace this placeholder image with a real one in your /public folder */}
                  <Image
                    src="/hero-image.jpg"
                    width={600}
                    height={400}
                    alt="A collection of electronic devices like laptops, phones, and monitors ready for recycling"
                    className="rounded-xl shadow-2xl"
                  />
                  <div className="absolute -bottom-8 -left-8 z-10 hidden md:block">
                    <div className="rounded-full bg-background p-4 shadow-lg">
                      <Laptop className="h-10 w-10 text-accent" />
                    </div>
                  </div>
                  <div className="absolute -right-8 -top-8 z-10 hidden md:block">
                    <div className="rounded-full bg-background p-4 shadow-lg">
                      <Smartphone className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                How It Works
              </h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                Recycling your e-waste has never been easier. Follow these four
                simple steps.
              </p>
            </div>
            <div className="mx-auto mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item) => (
                <div key={item.step} className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                A Platform Built for Good
              </h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                We provide all the tools you need for a safe and rewarding
                recycling experience.
              </p>
            </div>
            <div className="mx-auto mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="pt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-primary py-16 md:py-24">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center text-primary-foreground md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Ready to Make a Difference?
            </h2>
            <p className="max-w-2xl text-lg">
              Join our community today and take the first step towards
              responsible e-waste disposal. It-s free, easy, and good for the
              planet.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href={getStartedLink}>
                Start Recycling Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            © {year ?? new Date().getFullYear()} ReSource Hub. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm hover:underline"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline"
              prefetch={false}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}