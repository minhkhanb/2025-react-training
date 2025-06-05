'use client';

import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, ...rest }, ref) => {
    return (
      <div className="flex flex-col items-start mt-4">
        <div className="flex items-center">
          <input
            id={id}
            ref={ref}
            type="checkbox"
            {...rest}
            className={`mr-2 rounded border-gray-500 text-indigo-600 focus:ring-indigo-500 ${
              error ? 'border-red-500' : ''
            }`}
          />

          <label htmlFor={id} className="select-none text-gray-700">
            {label}
            <span className="text-red-500 ml-1">*</span>
          </label>
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
