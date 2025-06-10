import { ReactNode } from 'react';
import { ToastProvider } from '../components/providers/ToastProvider';
import { TodoProvider } from '../components/providers/TodoProvider';

const ToastProviders = ({ children }: { children: ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

const TodoProviders = ({ children }: { children: ReactNode }) => {
  return <TodoProvider>{children}</TodoProvider>;
};

export { ToastProviders, TodoProviders };
