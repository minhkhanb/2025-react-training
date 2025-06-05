'use client';

import React, { SelectHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  label,
  options,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="mb-1 text-xs font-semibold tracking-wide text-gray-600 hover:text-gray-900 cursor-pointer"
      >
        {label}
      </label>

      <select
        id={name}
        {...register(name)}
        {...rest}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 bg-white"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-xs mt-1">{String(error)}</p>}
    </div>
  );
};

export default Dropdown;
