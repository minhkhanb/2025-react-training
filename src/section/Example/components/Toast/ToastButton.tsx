'use client';

import { useToast } from '@/src/components/providers/ToastProvider';
import { cn } from '@/src/utils';
import { ToastButtonTypes } from '@/src/@types/toast.types';

const ToastButton: React.FC<ToastButtonTypes> = ({
  type,
  title,
  message,
  className,
  duration = 3000,
}) => {
  const typeClassMap: Record<ToastButtonTypes['type'], string> = {
    success: 'bg-green-500 hover:bg-green-600 text-white',
    error: 'bg-red-500 hover:bg-red-600 text-white',
    warning: 'bg-yellow-400 hover:bg-yellow-500 text-black',
    info: 'bg-blue-500 hover:bg-blue-600 text-white',
  };

  const { showToast } = useToast();
  return (
    <button
      className={cn(
        'max-w-40 w-full px-4 py-2 text-white rounded cursor-pointer',
        typeClassMap[type],
        className
      )}
      onClick={() =>
        showToast({
          type,
          message,
          title,
          duration,
        })
      }
      data-type={type}
    >
      Toast {type}
    </button>
  );
};

export default ToastButton;
