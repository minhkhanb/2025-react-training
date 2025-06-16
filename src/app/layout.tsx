import type { Metadata } from 'next';
import './globals.css';
import ToastProvider from '@src/components/providers/Toast';
import QueryProvider from '@src/components/providers/ReactQuery';
import { SidebarProvider, SidebarTrigger } from '@src/components/shadcn/ui/sidebar';
import DashboardSidebar from '@src/components/layout/Sidebar';

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
          <SidebarProvider>
            <DashboardSidebar />
            <main className="flex-1 p-4 overflow-x-auto overflow-y-auto">
              <SidebarTrigger />
              <div>{children}</div>
            </main>
          </SidebarProvider>
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
