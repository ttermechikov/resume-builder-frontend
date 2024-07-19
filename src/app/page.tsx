import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Resume Builder</h1>
      <div>
        <Link href="/dashboard">Open resume editor</Link>
      </div>
    </main>
  );
}
