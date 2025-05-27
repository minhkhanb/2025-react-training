import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';
import ToastProvider from '@src/components/providers/Toast/Toast';
import MainLayout from '@src/components/layout/MainLayout';
import Providers from '@src/app/providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '2025 React Training',
  description: 'A comprehensive training course for mastering React in 2025',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Providers>
          <ToastProvider />

          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
