'use client';

import { createContext } from 'react';
import { ToastContextProps } from '@/src/@types/toast.types';

export const ToastContext = createContext<ToastContextProps | undefined>(
    undefined
);
