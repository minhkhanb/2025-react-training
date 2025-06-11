import { Label } from '@/src/components/shadcn/ui/label';
import { FormField } from '@/src/components/ui/Form';

type FormInputProps = {
  name: string;
  label: string;
  placeholder: string;
  component: React.ElementType;
};
const FormInput = ({ name, label, placeholder, component }: FormInputProps) => {
  return (
    <div className="mb-4">
      <Label htmlFor={name as string} className="mb-1 block">
        {label}
      </Label>
      <FormField name={name} placeholder={placeholder} component={component} />
    </div>
  );
};

export default FormInput;
