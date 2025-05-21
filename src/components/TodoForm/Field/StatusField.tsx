import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form';
import { formSchema } from '../formSchema';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { Select } from '@src/components/ui/select';
import { SelectTrigger, SelectValue } from '@src/components/ui/select';
import { SelectContent, SelectItem } from '@src/components/ui/select';

type StatusFieldProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export default function StatusField({ form }: StatusFieldProps) {
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
