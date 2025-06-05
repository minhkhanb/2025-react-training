'use client';

import React, { forwardRef, SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Option[];
  error?: string;
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ name, label, options, error, className, ...rest }, ref) => {
    return (
      <div className="mt-6">
        <label
          htmlFor={name}
          className="mb-1 text-xs font-semibold tracking-wide text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          {label}
        </label>

        <select
          id={name}
          name={name}
          ref={ref}
          {...rest}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 bg-white ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
