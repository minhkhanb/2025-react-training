import { ReactNode } from 'react';
import { ToastProvider } from '../components/providers/ToastProvider';

export const ToastProviders = ({ children }: { children: ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};
