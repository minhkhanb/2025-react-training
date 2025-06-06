import React, {
  ComponentPropsWithoutRef,
  createElement,
  ElementType,
} from 'react';
import {
  useForm,
  FormProvider,
  FieldValues,
  DefaultValues,
  Controller,
  useFormContext,
  UseFormReturn,
  ControllerRenderProps,
  Path,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import FieldError from './Field/FieldError';

export interface FormWrapperProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: T, methods: UseFormReturn<T>) => void;
  defaultValues?: DefaultValues<T>;
  validationSchema?: AnyObjectSchema;
}

const Form = <T extends FieldValues>({
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
      <form onSubmit={methods.handleSubmit(data => onSubmit(data, methods))}>
        {children}
      </form>
    </FormProvider>
  );
};

type FormFieldProps<
  TFieldValues extends FieldValues,
  TComponent extends ElementType,
> = {
  name: Path<TFieldValues>;
  component: TComponent;
} & Omit<ComponentPropsWithoutRef<TComponent>, keyof ControllerRenderProps>;

const FormField = <
  TFieldValues extends FieldValues,
  TComponent extends ElementType,
>({
  name,
  component,
  ...rest
}: FormFieldProps<TFieldValues, TComponent>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          createElement(component, {
            ...rest,
            ...field,
            ...(rest.type === 'checkbox' && { checked: field.value }),
          })
        }
      />

      <FieldError errors={errors} name={name} />
    </>
  );
};

export { Form, FormField };
