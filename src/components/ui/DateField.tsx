import React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@src/components/shadcn/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@src/components/shadcn/ui/popover';
import { Button } from '@src/components/shadcn/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@src/lib/utils';
import { FieldComponentProps } from '@src/components/common/Form';

export const DateField = React.forwardRef<HTMLButtonElement, FieldComponentProps<Date>>(
  ({ value, onChange, onBlur, name: _name, error, className, disabled, placeholder }, ref) => {
    const hasError = !!error;

    const isValidDate = (d: unknown): d is Date => d instanceof Date && !isNaN(d.getTime());
    let selectedDate: Date | undefined = undefined;
    if (isValidDate(value)) {
      selectedDate = value;
    } else if (typeof value === 'string') {
      const parsed = new Date(value);
      selectedDate = isValidDate(parsed) ? parsed : undefined;
    }

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !selectedDate && 'text-muted-foreground',
              hasError && 'border-red-500 focus:border-red-500',
              className
            )}
          >
            {selectedDate ? format(selectedDate, 'PPP') : <span>{placeholder}</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={date => {
              if (date) onChange(date);
              onBlur();
            }}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DateField.displayName = 'DateField';
