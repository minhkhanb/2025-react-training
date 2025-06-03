import React from 'react';
import { cn } from '@src/lib/utils';
import { FieldComponentProps } from '@src/components/common/Form';
import { Checkbox } from '@src/components/shadcn/ui/checkbox';

export const CheckBoxField = React.forwardRef<HTMLInputElement, FieldComponentProps<boolean>>(
  ({ value, onChange, onBlur, name, error, className, disabled, placeholder, ...rest }, _ref) => {
    const hasError = !!error;
    return (
      <label className={cn('flex items-center gap-2 cursor-pointer select-none', className)}>
        <Checkbox
          checked={!!value}
          onCheckedChange={checked => onChange(!!checked)}
          onBlur={onBlur}
          name={name}
          disabled={disabled}
          className={cn(hasError && 'border-red-500 focus:border-red-500')}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          {...rest}
        />
        <span>{placeholder}</span>
      </label>
    );
  }
);

CheckBoxField.displayName = 'CheckBoxField';
