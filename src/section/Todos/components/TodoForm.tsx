'use client';

import React, { useState } from 'react';
import { Textarea } from '@/src/components/shadcn/ui/textarea';
import { Button } from '@/src/components/shadcn/ui/button';
import { Input } from '@/src/components/shadcn/ui/input';
import MainForm from '@/src/components/MainForm';
import { TodoData, todoSchema } from '../schema';
import { UseFormReturn } from 'react-hook-form';
import FormInput from './FormInput';
import { useRouter } from 'next/navigation';

type FormProps = {
  buttonName: string;
  defaultValuesProps?: TodoData;
  handleSubmit: (data: TodoData) => void;
};

const defaultValues: TodoData = {
  title: '',
  subTitle: '',
  note: '',
};

const TodoForm: React.FC<FormProps> = ({
  buttonName,
  defaultValuesProps,
  handleSubmit,
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState<TodoData>(
    defaultValuesProps || defaultValues
  );

  const onSubmit = <T extends TodoData>(data: T, methods: UseFormReturn<T>) => {
    const { title, subTitle } = data;

    if (title.trim() && subTitle.trim()) {
      handleSubmit(data);
      setFormData(defaultValues);
      router.back();
    }

    methods.reset();
  };

  return (
    <MainForm
      onSubmit={onSubmit}
      defaultValues={formData}
      validationSchema={todoSchema}
    >
      <div className="flex flex-col gap-1 mt-8">
        <FormInput
          name="title"
          label="Title"
          placeholder="Enter Title"
          component={Input}
        />
        <FormInput
          name="subTitle"
          label="SubTitle"
          placeholder="Enter Sub Title"
          component={Input}
        />
        <FormInput
          name="note"
          label="Note"
          placeholder="Enter Note"
          component={Textarea}
        />
        <Button type="submit" className="mt-4 w-full cursor-pointer">
          {buttonName}
        </Button>
      </div>
    </MainForm>
  );
};

export default TodoForm;
