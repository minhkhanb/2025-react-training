'use client';
import { ToastButton } from '../components/providers/Toast';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 py-12 justify-center items-center">
      <div className="font-bold">Welcome to Toaster</div>
      <ToastButton type="info" message="This is a toast notification info" />
      <ToastButton type="error" message="This is a toast notification error" />
      <ToastButton
        type="warning"
        message="This is a toast notification warning"
      />
      <ToastButton
        type="success"
        title="Toast title"
        message="This is a toast notification success"
        duration={500000}
      />
    </div>
  );
}
