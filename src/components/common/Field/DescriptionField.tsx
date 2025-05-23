import React from 'react';
import { Textarea } from '@src/components/ui/textarea';
import { FieldError } from 'react-hook-form';
import { cn } from '@src/lib/utils';

interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  name: string;
  error?: FieldError | boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const DescriptionField = React.forwardRef<HTMLTextAreaElement, DescriptionFieldProps>(
  (
    {
      value,
      onChange,
      onBlur,
      name,
      error,
      className,
      disabled,
      placeholder = 'Enter todo description',
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <Textarea
        ref={ref}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'h-[100px] resize-none',
          hasError && 'border-red-500 focus:border-red-500',
          className
        )}
      />
    );
  }
);

DescriptionField.displayName = 'DescriptionField';
