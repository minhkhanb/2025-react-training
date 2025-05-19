'use client';

import { toastManager } from '../../utils/toastManager';

interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export const ShowToastSingletonButton = () => {
  const addToast = (title: string, message: string, type: Toast['type']) => {
    toastManager.addToast(title, message, type);
    console.log('Add toast button clicked');
  };

  return (
    <div className="flex gap-4">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
        onClick={() => addToast('Hello', 'This is a toast', 'success')}
      >
        Toast Success
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
        onClick={() => addToast('Hello', 'This is a toast', 'error')}
      >
        Toast Error
      </button>
      <button
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
        onClick={() => addToast('Hello', 'This is a toast', 'warning')}
      >
        Toast Warning
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        onClick={() => addToast('Hello', 'This is a toast', 'info')}
      >
        Toast Info
      </button>
    </div>
  );
};
