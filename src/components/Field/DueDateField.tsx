import React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@src/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@src/components/ui/popover';
import { Button } from '@src/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@src/lib/utils';
import { FieldError } from 'react-hook-form';

interface DueDateFieldProps {
  value: Date;
  onChange: (value: Date) => void;
  onBlur: () => void;
  name: string;
  error?: FieldError | boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const DueDateField = React.forwardRef<HTMLButtonElement, DueDateFieldProps>(
  (
    {
      value,
      onChange,
      onBlur,
      name: _name,
      error,
      className,
      disabled,
      placeholder = 'Pick a date',
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !value && 'text-muted-foreground',
              hasError && 'border-red-500 focus:border-red-500',
              className
            )}
          >
            {value ? format(value, 'PPP') : <span>{placeholder}</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={date => {
              if (date) {
                onChange(date);
                onBlur();
              }
            }}
            disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DueDateField.displayName = 'DueDateField';
