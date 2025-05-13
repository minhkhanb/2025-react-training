import React, { cloneElement } from 'react';
import { FormFieldProps } from '../../types/IForm';
import { Controller, useFormContext } from 'react-hook-form';

export default function FormField({ name, child }: FormFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { onChange: rhfOnChange, ...restField } = field;

        // console.log(fieldState, field);

        return cloneElement(child, {
          ...restField,
          error: fieldState.error?.message,
          onChange: (e: unknown) => {
            rhfOnChange(e);
            child.props.onChange?.(e);
          },
        });
      }}
    />
  );
}
