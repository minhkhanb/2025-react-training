interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export type { Toast };

export const toastManager = {
  listeners: [] as Array<(toast: Toast) => void>,

  addToast(title: string, message: string, type: Toast['type'], duration = 3000): void {
    const toast: Toast = {
      id: Date.now().toString(),
      title,
      message,
      type,
      duration,
    };

    this.listeners.forEach(listener => listener(toast));
  },

  subscribe(listener: (toast: Toast) => void): () => void {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
};
