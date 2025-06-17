'use client';

import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value?: string;
  error?: string;
  name: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, name, value, ...rest }, ref) => {
    return (
      <div className="flex flex-col items-start mt-4">
        <div className="flex items-center">
          <input
            checked={Boolean(value)}
            ref={ref}
            type="checkbox"
            {...rest}
            className={`mr-2 rounded border-gray-500 text-indigo-600 focus:ring-indigo-500 ${
              error ? 'border-red-500' : ''
            }`}
          />

          <label htmlFor={name} className="select-none text-gray-700">
            {label} {value}
            <span className="text-red-500 ml-1">*</span>
          </label>
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
