import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form';
import { formSchema } from '../formSchema';
import { Textarea } from '@src/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

type DescriptionFieldProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export default function DescriptionField({ form }: DescriptionFieldProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              className="h-[100px] resize-none overflow-y-hidden"
              placeholder="Enter todo description"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
