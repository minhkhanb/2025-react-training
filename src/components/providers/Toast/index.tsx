'use client';

import { toastManager, Toast } from '../../../modules/toast';
import { useEffect, useState } from 'react';
import { ToastItem } from './ToastItem';

export default function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (toast: Toast) => {
      setToasts(current => [...current, toast]);

      setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);
    };

    return toastManager.subscribe(handleToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts(current => current.filter(t => t.id !== id));
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 space-y-4">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
