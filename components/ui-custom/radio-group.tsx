import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Option } from "./select";

interface Props {
  options: Option[];
  onChange: (value: string) => void;
  defaultValue?: string;
}

const RadioGroupCustomize = ({
  options,
  onChange,
  defaultValue = "",
}: Props) => {
  return (
    <RadioGroup onValueChange={onChange} defaultValue={defaultValue}>
      {options.map((option, index) => (
        <div key={option.value + index} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioGroupCustomize;
