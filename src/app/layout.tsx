import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/app/ui/header';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Resume Builder',
  description: 'Create CV Online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen w-full flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Header>
          <Link href="/">Resume Builder</Link>
        </Header>
        {children}
      </body>
    </html>
  );
}
