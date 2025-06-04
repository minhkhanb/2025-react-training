export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export type ToastButtonTypes = Omit<Toast, 'id'> & {
  className?: string;
};

export interface ToastContextProps {
  showToast: (params: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}
