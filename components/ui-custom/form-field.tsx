/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Label } from "../ui/label";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Spinner } from "./spinner";
import { ErrorMessage } from "@hookform/error-message";

type Props<T extends React.ElementType> = {
  component: T;
  label: string;
  field: string;
  onChange?: (value: string) => void;
  isPending?: boolean;
} & Omit<React.ComponentProps<T>, "name">;

const FormField = <T extends React.ElementType>({
  component: Component,
  label,
  field,
  onChange,
  isPending = false,
  ...props
}: Props<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleChange = (
    e: any,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    console.log(e);
    if (e.target) {
      field.onChange(e.target.value);
      onChange?.(e.target.value);
    } else {
      field.onChange(e);
      onChange?.(e);
    }
  };

  return (
    <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
      <Label className="text-right">{label}</Label>
      {isPending ? (
        <div className="col-span-3 flex items-center justify-center">
          <Spinner className="w-10" />
        </div>
      ) : (
        <Controller
          name={field}
          control={control}
          render={({ field }) => (
            <Component
              {...field}
              {...(props as any)}
              onChange={(e: any) => handleChange(e, field)}
              className="col-span-3 text-sm"
            />
          )}
        />
      )}
      <ErrorMessage
        errors={errors}
        name={field}
        render={({ message }) => (
          <Label className="text-right col-start-2 col-span-3 font-thin text-sm text-red-400">
            {message}
          </Label>
        )}
      />
    </div>
  );
};

export default FormField;
