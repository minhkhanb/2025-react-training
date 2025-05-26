/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Form = () => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input id="name" {...field} className="col-span-3" />
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Description
        </Label>
        <Controller
          name="subtitle"
          control={control}
          render={({ field }) => (
            <Input id="name" {...field} className="col-span-3" />
          )}
        />
      </div>
    </div>
  );
};

export default Form;
