import { ElementType } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { Label } from '@/src/components/shadcn/ui/label';
import { FormField } from '@/src/components/ui/Form';

type InputType = 'shadcnCheckbox' | 'shadcnSelect';

type FormInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  input?: InputType;
  placeholder?: string;
  component: ElementType;
};

const FormInput = <TFieldValues extends FieldValues>({
  name,
  label,
  input,
  placeholder,
  component,
}: FormInputProps<TFieldValues>) => {
  return (
    <div className="mb-4">
      <Label htmlFor={name as string} className="mb-1 block">
        {label}
      </Label>
      <FormField
        name={name}
        input={input}
        placeholder={placeholder}
        component={component}
      />
    </div>
  );
};

export default FormInput;
