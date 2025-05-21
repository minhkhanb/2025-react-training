// components/Loading.tsx
'use client';

import { cn } from '@/utils/cn';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

interface LoadingProps {
  className?: string;
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ className, message = 'Is loading...' }) => {
  return (
    <div
      className={cn(
        'animate-fade-in flex flex-col items-center justify-center gap-3 py-10 text-center text-gray-700',
        className
      )}
    >
      <LoadingOutlined className="text-lg text-blue-600" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default Loading;
