/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FormEvent, ReactNode, useId, useRef } from 'react';
import { useForm, FormProvider, UseFormReturn, DefaultValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
interface Props {
  className?: string;
  children: ReactNode;
  validationSchema: yup.ObjectSchema<any>; // Yup schema
  defaultValues: any;
  onSubmit: (data: any, methods: UseFormReturn<any>, defaultValues: DefaultValues<any>) => void;
  mode?: 'onBlur' | 'onChange' | 'onSubmit';
}

export function Form({
  children,
  className,
  validationSchema,
  defaultValues,
  onSubmit,
  mode = 'onBlur',
}: Props) {
  const ref = useRef<HTMLFormElement | null>(null);

  const id = useId();

  const methods = useForm({
    resolver: validationSchema && yupResolver(validationSchema),
    defaultValues,
    mode,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    return methods.handleSubmit(values => {
      onSubmit(values, methods, defaultValues);
    })(e);
  };

  return (
    <FormProvider {...methods}>
      <form id={id} ref={ref} className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
