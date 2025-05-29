'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = useCallback((): void => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) {
        onClose();
      } else {
        router.back();
      }
    }, 200);
  }, [onClose, router]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  const sizeClasses: Record<ModalSize, string> = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
    fullscreen: 'max-w-full m-6',
  };

  const modalSizeClass = sizeClasses[size] || sizeClasses.medium;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const backdropClass = `
    fixed inset-0 z-50 flex items-center justify-center p-4
    transition-all duration-300 ease-out
    ${isVisible && !isClosing ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 opacity-0'}
  `;

  const modalClass = `
    relative ${modalSizeClass} w-full
    bg-white rounded-2xl shadow-2xl border border-gray-200/50
    transition-all duration-300 ease-out transform-gpu
    ${
      isVisible && !isClosing
        ? 'opacity-100 scale-100 translate-y-0'
        : 'opacity-0 scale-95 translate-y-8'
    }
  `;

  return (
    <div className={backdropClass}>
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      <div
        className={modalClass}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div>
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            </div>
          </div>

          {showCloseButton && (
            <button
              onClick={handleClose}
              className="group cursor-pointer rounded-xl p-2 transition-colors hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
