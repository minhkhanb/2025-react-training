import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';

interface FieldErrorProps {
  errors: FieldErrors;
  name: string;
}

const FieldError: React.FC<FieldErrorProps> = ({ errors, name }) => (
  <ErrorMessage
    errors={errors}
    name={name}
    render={({ message }) => (
      <p className="text-red-500 text-xs mt-1">{message}</p>
    )}
  />
);

export default FieldError;
