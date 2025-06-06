'use client';

import React, { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  error?: string;
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, label, error, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col mt-4">
        <label
          htmlFor={name}
          className="mb-1 text-xs font-semibold tracking-wide text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          {label}
        </label>

        <textarea
          id={name}
          name={name}
          ref={ref}
          {...rest}
          className={`rounded-md border text-black placeholder:text-gray-500 px-3 py-2 text-base leading-6 resize-y min-h-[120px] bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 ${
            error ? 'border-red-500' : 'border-gray-500'
          } ${className}`}
        />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
