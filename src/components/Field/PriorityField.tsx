import React from 'react';
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from '@src/components/ui/select';
import { Select } from '@src/components/ui/select';
import { FieldError } from 'react-hook-form';
import { cn } from '@src/lib/utils';

interface PriorityFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  name: string;
  error?: FieldError | boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const PriorityField = React.forwardRef<HTMLButtonElement, PriorityFieldProps>(
  (
    {
      value,
      onChange,
      onBlur,
      name: _name,
      error,
      className,
      disabled,
      placeholder = 'Select priority',
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <Select
        value={value}
        onValueChange={onChange}
        onOpenChange={open => !open && onBlur?.()}
        disabled={disabled}
      >
        <SelectTrigger
          ref={ref}
          className={cn(hasError && 'border-red-500 focus:border-red-500', className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    );
  }
);

PriorityField.displayName = 'PriorityField';
