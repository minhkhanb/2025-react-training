interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export const toastManager = {
  toasts: [] as Toast[],
  listeners: [] as Array<(toasts: Toast[]) => void>,

  getToasts(): Toast[] {
    return this.toasts;
  },

  addToast(title: string, message: string, type: Toast['type']): void {
    const toast: Toast = {
      id: Date.now(),
      title,
      message,
      type,
    };
    this.toasts.push(toast);
    this.notify();

    setTimeout(() => {
      this.removeToast(toast.id);
    }, 3000);
  },

  removeToast(id: number): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notify();
  },

  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.push(listener);
    listener(this.toasts);
  },

  unsubscribe(listener: (toasts: Toast[]) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  },

  notify() {
    this.listeners.forEach(listener => listener(this.toasts));
  },
};
