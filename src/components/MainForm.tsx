import React from 'react';
import { Form } from './ui/Form';
import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

export interface Props<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: T, methods: UseFormReturn<T>) => void;
  defaultValues?: DefaultValues<T>;
  validationSchema?: AnyObjectSchema;
}

const MainForm = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  validationSchema,
}: Props<T>) => {
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      validationSchema={validationSchema}
    >
      {children}
    </Form>
  );
};

export default MainForm;
