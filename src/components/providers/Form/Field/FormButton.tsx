'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormButtonProps {
  label: string;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
}

const FormButton: React.FC<FormButtonProps> = ({
  label,
  type,
  className = '',
}) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <button
      type={type}
      className={`w-full cursor-pointer py-2 mt-4 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none ${className}`}
    >
      {isSubmitting ? 'Sending...' : label}
    </button>
  );
};

export default FormButton;
