'use client';

// use to test the toast

import { toastManager, Toast } from '@src/modules/toast';
import { cn } from '@src/utils/cn';

interface ToastButtonProps {
  type: Toast['type'];
  className?: string;
}

const buttonStyles: Record<Toast['type'], string> = {
  success: 'bg-green-500 hover:bg-green-600',
  error: 'bg-red-500 hover:bg-red-600',
  warning: 'bg-yellow-500 hover:bg-yellow-600',
  info: 'bg-blue-500 hover:bg-blue-600',
};

const ToastButton = ({ type, className = '' }: ToastButtonProps) => (
  <button
    className={cn('px-4 py-2 text-white rounded cursor-pointer', buttonStyles[type], className)}
    onClick={() => toastManager.addToast('Hello', 'This is a toast', type)}
  >
    Toast {type.charAt(0).toUpperCase() + type.slice(1)}
  </button>
);

export const ToastButtons = () => (
  <div className="flex gap-4">
    <ToastButton type="success" />
    <ToastButton type="error" />
    <ToastButton type="warning" />
    <ToastButton type="info" />
  </div>
);
