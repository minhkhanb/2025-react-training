import React from 'react';
import { Input } from '@src/components/ui/input';
import { FieldError } from 'react-hook-form';
import { cn } from '@src/lib/utils';

interface TitleFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  name: string;
  error?: FieldError | boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const TitleField = React.forwardRef<HTMLInputElement, TitleFieldProps>(
  (
    { value, onChange, onBlur, name, error, className, disabled, placeholder = 'Enter todo title' },
    ref
  ) => {
    const hasError = !!error;

    return (
      <Input
        ref={ref}
        autoFocus
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(hasError && 'border-red-500 focus:border-red-500', className)}
      />
    );
  }
);

TitleField.displayName = 'TitleField';
