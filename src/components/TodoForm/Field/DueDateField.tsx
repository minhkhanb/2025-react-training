import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form';
import { formSchema } from '../formSchema';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar } from '@src/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@src/components/ui/popover';
import { Button } from '@src/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@src/lib/utils';

type DueDateFieldProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export default function DueDateField({ form }: DueDateFieldProps) {
  return (
    <FormField
      control={form.control}
      name="dueDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Due Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={field.onChange}
                disabled={date => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
