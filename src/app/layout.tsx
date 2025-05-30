import type { Metadata } from 'next';
import './globals.css';
import ToastProvider from '@src/components/providers/Toast';
import QueryProvider from '@src/components/providers/ReactQuery';

export const metadata: Metadata = {
  title: 'My App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
