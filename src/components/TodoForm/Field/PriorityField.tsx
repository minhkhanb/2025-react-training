import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form';
import { formSchema } from '../formSchema';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from '@src/components/ui/select';
import { Select } from '@src/components/ui/select';

type PriorityFieldProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export default function PriorityField({ form }: PriorityFieldProps) {
  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Priority</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
