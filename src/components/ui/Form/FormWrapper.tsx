import React from 'react';
import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
  DefaultValues,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

export interface FormWrapperProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  validationSchema?: AnyObjectSchema;
}

const FormWrapper = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  validationSchema,
}: FormWrapperProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default FormWrapper;
