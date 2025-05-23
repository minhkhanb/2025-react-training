import React from 'react';
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from '@src/components/ui/select';
import { Select } from '@src/components/ui/select';
import { FieldError } from 'react-hook-form';
import { cn } from '@src/lib/utils';

interface StatusFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  name: string;
  error?: FieldError | boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const StatusField = React.forwardRef<HTMLButtonElement, StatusFieldProps>(
  (
    {
      value,
      onChange,
      onBlur,
      name: _name,
      error,
      className,
      disabled,
      placeholder = 'Select status',
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
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    );
  }
);

StatusField.displayName = 'StatusField';
