import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter as FontSans } from 'next/font/google';

import { LogoutButton } from '@/components/custom/logout-button';
import { cn } from '@/lib/utils';
import Header from '@/app/ui/header';
import { Button } from '@/components/ui/button';
import { getUserMeLoader } from '@/data/services/get-user-me-loader';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Resume Builder',
  description: 'Create CV Online',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserMeLoader();

  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen w-full flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Header className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="container mx-auto max-w-7xl px-6 flex items-center justify-between py-4">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Resume Builder
              </Link>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
              </Button>
            </div>
            <div>{user.ok ? <LogoutButton /> : null}</div>
          </div>
        </Header>

        {children}
      </body>
    </html>
  );
}
