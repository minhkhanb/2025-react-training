'use client';

import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ name, label, className, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="flex flex-col mb-6">
      <label
        htmlFor={name}
        className="mb-1 text-xs font-semibold tracking-wide text-gray-600 hover:text-gray-900 cursor-pointer"
      >
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        {...rest}
        className={`rounded-md border text-black placeholder:text-gray-500 px-3 py-2 text-base leading-6 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 ${
          error ? 'border-red-500' : 'border-gray-500'
        } ${className}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{String(error)}</p>}
    </div>
  );
};

export default Input;
