/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Label } from "../ui/label";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  component: any;
  label: string;
  field: string;
}

const FormField = ({ component: Component, label, field }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right">{label}</Label>
      <Controller
        name={field}
        control={control}
        render={({ field }) => (
          <Component {...field} className="col-span-3 text-sm" />
        )}
      />
    </div>
  );
};

export default FormField;
