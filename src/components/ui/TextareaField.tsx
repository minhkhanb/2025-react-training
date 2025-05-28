import React from 'react';
import { Textarea } from '@src/components/shadcn/ui/textarea';
import { cn } from '@src/lib/utils';
import { FieldComponentProps } from '@src/components/common/Form';

export const TextareaField = React.forwardRef<HTMLTextAreaElement, FieldComponentProps>(
  ({ value, onChange, onBlur, name, error, className, disabled, placeholder }, ref) => {
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

TextareaField.displayName = 'TextareaField';
