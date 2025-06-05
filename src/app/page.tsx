'use client';

import ToastButton from '../components/providers/Toast/ToastButton';
import ValidationForm from '@/src/components/providers/Form/Field/ValidationForm';
import { ToastButtonTypes } from '../@types/toast.types';

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

export default function Home() {
  return (
    <>
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
      <ValidationForm />
    </>
  );
}
