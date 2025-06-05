'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  required = false,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="flex flex-col items-start mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          {...register(name, { required })}
          {...rest}
          className={`mr-2 rounded border-gray-500 text-indigo-600 focus:ring-indigo-500 ${
            error ? 'border-red-500' : ''
          }`}
        />
        <label htmlFor={name} className="select-none text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{String(error)}</p>}
    </div>
  );
};

export default Checkbox;
