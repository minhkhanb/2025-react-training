'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/src/utils/cn';

interface ToastItemProps {
  onRemove: () => void;
  title?: string;
  message: string;
  className?: string;
}

const ToastItem: React.FC<ToastItemProps> = ({
  onRemove,
  title,
  message,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('px-4 py-3 rounded shadow-md text-white w-80', className)}
    >
      {title && (
        <div className="flex items-center justify-between font-semibold text-base mb-1">
          <span>{title}</span>
          <button
            className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label="Close"
            onClick={onRemove}
          >
            x
          </button>
        </div>
      )}
      <div className="text-sm leading-relaxed">{message}</div>
    </motion.div>
  );
};

export default ToastItem;
