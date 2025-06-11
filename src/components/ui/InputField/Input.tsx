'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, name, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col mt-4">
        {label && (
          <label
            htmlFor={name}
            className="mb-1 text-xs font-semibold tracking-wide text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          {...rest}
          className={`rounded-md border text-black placeholder:text-gray-500 px-3 py-2 text-base leading-6 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 ${
            error ? 'border-red-500' : 'border-gray-500'
          } ${className}`}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
