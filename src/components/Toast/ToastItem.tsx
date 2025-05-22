import { Toast } from '@src/modules/toast';
import { cn } from '@src/utils/cn';

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
  const typeStyles = {
    success: {
      container: 'bg-green-100 border-green-500',
      title: 'text-green-800',
      message: 'text-green-600',
    },
    error: {
      container: 'bg-red-100 border-red-500',
      title: 'text-red-800',
      message: 'text-red-600',
    },
    warning: {
      container: 'bg-yellow-100 border-yellow-500',
      title: 'text-yellow-800',
      message: 'text-yellow-600',
    },
    info: {
      container: 'bg-blue-100 border-blue-500',
      title: 'text-blue-800',
      message: 'text-blue-600',
    },
  };

  const styles = typeStyles[toast.type];

  return (
    <div
      className={cn(styles.container, 'shadow-lg rounded-lg p-4 border-l-4 relative min-w-[300px]')}
    >
      <h3 className={cn(styles.title, 'text-lg font-medium')}>{toast.title}</h3>
      <p className={cn(styles.message, 'mt-1 text-sm')}>{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        ✕
      </button>
    </div>
  );
};
