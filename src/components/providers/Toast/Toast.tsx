'use client';

import React from 'react';
import { subscribeToast, Toast } from '@src/modules/toast';
import { CircleCheck, X } from 'lucide-react';

import './toast.css';

function ToastProvider() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  React.useEffect(() => {
    return subscribeToast(toast => {
      setToasts(prevState => [...prevState, toast]);
    });
  }, []);

  const removeToast = (id: string) => {
    setToasts(prevState => prevState.filter(toast => toast.id !== id));
  };

  console.log('Toats: ', toasts);

  return (
    <div id="toast">
      {/* Toast Success */}
      {toasts.map(({ id, title, message, type, duration }) => {
        const delay = (duration / 1000).toFixed(2);

        return (
          <div
            key={id}
            className={`toast toast--${type}`}
            style={{
              animation: `slideInLeft ease 0.3s, fadeOut linear 2s ${delay}s forwards`,
            }}
            onAnimationEnd={e => {
              // Check if it's the fadeOut animation that completed
              if (e.animationName === 'fadeOut') {
                removeToast(id);
              }
            }}
          >
            <div className="toast__icon">
              <CircleCheck />
            </div>
            <div className="toast__body">
              <h3 className="toast__title">{title}</h3>
              <p className="toast__msg">{message}</p>
            </div>
            <div className="toast__close" onClick={() => removeToast(id)}>
              <X />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ToastProvider;
