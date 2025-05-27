import React from 'react';
import { Input } from '@src/components/shadcn/ui/input';
import { cn } from '@src/lib/utils';
import { FieldComponentProps } from '@src/components/common/Form';

export const InputField = React.forwardRef<HTMLInputElement, FieldComponentProps>(
  ({ value, onChange, onBlur, name, error, className, disabled, placeholder, ...rest }, ref) => {
    const hasError = !!error;
    return (
      <Input
        ref={ref}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(hasError && 'border-red-500 focus:border-red-500', className)}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...rest}
      />
    );
  }
);

InputField.displayName = 'InputField';
