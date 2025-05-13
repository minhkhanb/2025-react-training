export interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration: number;
}

type ToastListener = (toast: Toast) => void;

let listeners: ToastListener[] = [];

export function toast({ title, message, type, duration }: Omit<Toast, 'id'>) {
  const newToast: Toast = {
    id: new Date().getTime().toString(),
    title,
    message,
    type,
    duration,
  };

  listeners.forEach(listener => listener(newToast));
}

export function subscribeToast(fn: ToastListener) {
  listeners.push(fn);

  return () => {
    listeners = listeners.filter(listener => listener !== fn);
  };
}
