import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from '@src/components/Toast';

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
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
