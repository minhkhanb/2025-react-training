import { ReactNode } from 'react';
import Sidebar from '../ui/Sidebar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-muted/40">{children}</main>
    </div>
  );
};

export default DashboardLayout;
