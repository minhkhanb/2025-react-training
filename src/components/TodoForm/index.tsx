'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@src/components/ui/button';
import { Form } from '@src/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@src/components/ui/dialog';
import { Todo } from '@src/types/todos';
import { useEffect, useState } from 'react';
import { formSchema } from './formSchema';
import * as z from 'zod';
import { TitleField, DescriptionField, StatusField, PriorityField, DueDateField } from './Field';

type TodoFormProps = {
  trigger: React.ReactNode;
  data?: Todo;
  onSubmitAction: (values: z.infer<typeof formSchema>) => void;
};

export default function TodoForm({ trigger, data, onSubmitAction }: TodoFormProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
      priority: 'low',
      dueDate: new Date(),
    },
  });

  useEffect(() => {
    if (open) {
      if (data) {
        form.reset({
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          dueDate: new Date(data.dueDate),
        });
      } else {
        form.reset({
          title: '',
          description: '',
          status: 'pending',
          priority: 'low',
          dueDate: new Date(),
        });
      }
    }
  }, [open, data, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmitAction(values);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data ? 'Edit Todo' : 'Add New Todo'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <TitleField form={form} />
            <DescriptionField form={form} />
            <div className="grid grid-cols-2 gap-4">
              <StatusField form={form} />
              <PriorityField form={form} />
            </div>
            <DueDateField form={form} />
            <Button className="w-full" type="submit">
              {data ? 'Update' : 'Add'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
