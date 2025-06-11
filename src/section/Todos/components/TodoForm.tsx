'use client';

import React from 'react';
import { Textarea } from '@/src/components/shadcn/ui/textarea';
import { Button } from '@/src/components/shadcn/ui/button';
import { Input } from '@/src/components/shadcn/ui/input';
import MainForm from '@/src/components/MainForm';
import { TodoData, todoSchema } from '../schema';
import { UseFormReturn } from 'react-hook-form';
import FormInput from './FormInput';

type FormProps = {
  buttonName: string;
  title: string;
  subTitle: string;
  note: string;
  handleSubmit: (data: TodoData) => void;
};

const TodoForm: React.FC<FormProps> = ({
  buttonName,
  title,
  subTitle,
  note,
  handleSubmit,
}) => {
  const onSubmit = <T extends TodoData>(data: T, methods: UseFormReturn<T>) => {
    handleSubmit(data);
    methods.reset();
  };

  return (
    <MainForm
      onSubmit={onSubmit}
      defaultValues={{
        title,
        subTitle,
        note,
      }}
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
