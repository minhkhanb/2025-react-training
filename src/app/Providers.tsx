'use client';

import { ToastProvider } from '@/components/Toast';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastProvider>{children}</ToastProvider>
      </Provider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
