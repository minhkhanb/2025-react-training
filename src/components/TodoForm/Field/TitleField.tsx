import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form';
import { Input } from '@src/components/ui/input';
import { formSchema } from '../formSchema';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

type TitleFieldProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export default function TitleField({ form }: TitleFieldProps) {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input autoFocus={true} placeholder="Enter todo title" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
