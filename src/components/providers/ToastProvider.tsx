'use client';

import React, { useState, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toast } from '@/src/@types/toast.types';
import ToastContainer from '../ToastContainer';
import { ToastContext } from './ToastContext';

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const showToast = useCallback(
        (params: {
            message: string;
            type: Toast['type'];
            title?: string;
            duration?: number;
        }) => {
            const { message, type, title = '', duration = 3000 } = params;
            const id = uuidv4();

            setToasts(prev => [
                ...prev,
                { id, message, type, title, duration },
            ]);

            setTimeout(() => {
                removeToast(id);
            }, duration);
        },
        []
    );

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};
