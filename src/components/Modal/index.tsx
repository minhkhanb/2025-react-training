'use client';

import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  size?: ModalSize;
}

export default function Modal({
  children,
  title,
  showCloseButton = true,
  onClose,
  size = 'medium',
}: ModalProps) {
  const router = useRouter();

  // Handle close modal
  const handleClose = useCallback((): void => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  // Determine modal size class
  const sizeClasses: Record<ModalSize, string> = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    fullscreen: 'max-w-full m-6',
  };

  const modalSizeClass = sizeClasses[size] || sizeClasses.medium;

  // Prevent clicks within the modal from bubbling to the backdrop
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(99,98,98,0.4)] backdrop-blur-sm">
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      <div
        className={`relative ${modalSizeClass} m-4 max-h-screen w-full overflow-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800`}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
            {title && (
              <h3 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}

            {showCloseButton && (
              <button
                onClick={handleClose}
                className="cursor-pointer rounded-full p-1 text-gray-500 transition-colors hover:text-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:text-gray-400 dark:hover:text-white"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            )}
          </div>
        )}

        {/* Modal Content */}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
