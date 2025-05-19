'use client';

import { toastManager } from '../../utils/toastManager';
import { useEffect, useState } from 'react';

export const ToastSingleton = () => {
  const [toasts, setToasts] = useState(toastManager.getToasts());

  useEffect(() => {
    const updateToasts = () => setToasts([...toastManager.getToasts()]);
    toastManager.subscribe(updateToasts);

    return () => {
      toastManager.unsubscribe(updateToasts);
    };
  }, []);

  return (
    <div className="fixed bottom-0 right-0 m-4 space-y-4">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
                    ${toast.type === 'success' && 'bg-green-100 border-green-500'} 
                    ${toast.type === 'error' && 'bg-red-100 border-red-500'}
                    ${toast.type === 'warning' && 'bg-yellow-100 border-yellow-500'}
                    ${toast.type === 'info' && 'bg-blue-100 border-blue-500'}
                    shadow-lg rounded-lg p-4 border-l-4 relative min-w-[300px]
                `}
        >
          <h3
            className={`text-lg font-medium ${
              toast.type === 'success'
                ? 'text-green-800'
                : toast.type === 'error'
                  ? 'text-red-800'
                  : toast.type === 'warning'
                    ? 'text-yellow-800'
                    : 'text-blue-800'
            }`}
          >
            {toast.title}
          </h3>
          <p
            className={`mt-1 text-sm ${
              toast.type === 'success'
                ? 'text-green-600'
                : toast.type === 'error'
                  ? 'text-red-600'
                  : toast.type === 'warning'
                    ? 'text-yellow-600'
                    : 'text-blue-600'
            }`}
          >
            {toast.message}
          </p>
          <button
            onClick={() => toastManager.removeToast(toast.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
