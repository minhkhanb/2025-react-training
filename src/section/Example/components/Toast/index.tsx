'use client';

import { ToastButtonTypes } from '@/src/@types/toast.types';
import ToastButton from './ToastButton';

const toastList: ToastButtonTypes[] = [
  { type: 'info', message: 'This is a toast notification info' },
  { type: 'error', message: 'This is a toast notification error' },
  { type: 'warning', message: 'This is a toast notification warning' },
  {
    type: 'success',
    title: 'Toast title',
    message: 'This is a toast notification success',
    duration: 500000,
  },
];

const Toast = () => {
  return (
    <div className="flex flex-col gap-4 py-12 justify-center items-center">
      <div className="font-bold">Welcome to Toaster</div>
      {toastList.map(({ type, message, title, duration }, i) => (
        <ToastButton
          key={i}
          type={type}
          message={message}
          title={title}
          duration={duration}
        />
      ))}
    </div>
  );
};

export default Toast;
