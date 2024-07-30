'use client';

export default function Header({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 z-10 md:px-6">
      {children}
    </header>
  );
}
