import Link from 'next/link';

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Link href="/dashboard/page-views">Page Views</Link>
        <Link href="/dashboard/visitors">Visitors</Link>
      </nav>
      <div>{children}</div>
    </>
  );
}
