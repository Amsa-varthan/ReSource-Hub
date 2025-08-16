import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { Toaster } from '@/components/ui/toaster';
import { ListingsProvider } from '@/context/listing-context';

// This is the section that enables rich link previews
export const metadata: Metadata = {
  title: 'ReSource Hub - Give Your E-Waste a New Life',
  description: 'ReSource Hub connects you with local, verified recyclers to dispose of your old electronics responsibly—and maybe even earn some cash.',
  openGraph: {
    title: 'ReSource Hub - Give Your E-Waste a New Life',
    description: 'A marketplace connecting households with e-waste to local recyclers.',
    url: 'https://amsa-varthan.github.io/ReSource-Hub/', // Your full website URL
    siteName: 'ReSource Hub',
    images: [
      {
        url: 'https://amsa-varthan.github.io/ReSource-Hub/og-image.png', // IMPORTANT: See note below
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <ListingsProvider>
            {children}
            <Toaster />
          </ListingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}