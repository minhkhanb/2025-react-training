'use client';

import { FC, memo } from 'react';
import * as yup from 'yup';
import MainForm from '@/src/components/MainForm';
import FormInput from './FormInput';
import { Textarea } from '@/src/components/shadcn/ui/textarea';
import { Button } from '@/src/components/shadcn/ui/button';
import { Input } from '@/src/components/shadcn/ui/input';

const todoSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters'),
  subTitle: yup.string().required('SubTitle is required'),
  note: yup.string(),
});

type TodoData = yup.InferType<typeof todoSchema>;

type FormProps = {
  defaultValuesProps?: TodoData;
  handleSubmit: (data: TodoData) => void;
};

const defaultValues: TodoData = {
  title: '',
  subTitle: '',
  note: '',
};

const TodoForm: FC<FormProps> = ({ defaultValuesProps, handleSubmit }) => {
  const mergedDefaultValues = defaultValuesProps ?? defaultValues;

  const onSubmit = (data: TodoData) => {
    const { title, subTitle } = data;

    if (title.trim() && subTitle.trim()) {
      handleSubmit(data);
    }
  };

  return (
    <MainForm
      onSubmit={onSubmit}
      defaultValues={mergedDefaultValues}
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
          Submit
        </Button>
      </div>
    </MainForm>
  );
};

export default memo(TodoForm);
