import React from 'react';
import { Toast } from '@/src/@types/toast.types';
import ToastItem from './ToastItem';

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
}) => {
  const toastStyles: Record<Toast['type'], string> = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-400 text-black',
    info: 'bg-blue-500',
  };

  return (
    <div className="fixed top-5 right-5 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          onRemove={() => removeToast(toast.id)}
          title={toast.title}
          message={toast.message}
          className={toastStyles[toast.type]}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
