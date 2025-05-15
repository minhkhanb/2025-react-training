import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';
import { FormValues } from '@src/validations/TaskSchema';
import { ErrorMessage } from '@hookform/error-message';

interface Props {
  name: keyof FormValues;
  component: any;
  placeholder: string;
  onChange?: (e: any) => void;
}

export const FormField = ({ name, component: Component, ...props }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e: any, field: any) => {
    field.onChange(e);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return <Component {...field} {...props} onChange={(e: any) => handleChange(e, field)} />;
        }}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className="text-[12px] text-red-500 pl-1">{message}</p>}
      />
    </div>
  );
};
