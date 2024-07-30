import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter as FontSans } from 'next/font/google';

import { LogoutButton } from '@/components/custom/logout-button';
import { cn } from '@/lib/utils';
import Header from '@/app/ui/header';
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
        <Header>
          <Link href="/dashboard">Resume Builder</Link>

          <div>{user.ok ? <LogoutButton /> : null}</div>
        </Header>
        {children}
      </body>
    </html>
  );
}
