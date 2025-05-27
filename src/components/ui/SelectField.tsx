import React from 'react';
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@src/components/shadcn/ui/select';
import { Select } from '@src/components/shadcn/ui/select';
import { cn } from '@src/lib/utils';
import { FieldComponentProps } from '@src/components/common/Form';

export const SelectField = React.forwardRef<HTMLButtonElement, FieldComponentProps>(
  (
    { value, onChange, onBlur, name: _name, error, className, disabled, placeholder, options },
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
          {options?.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

SelectField.displayName = 'SelectField';
