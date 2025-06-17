import { Checkbox } from '@/src/components/shadcn/ui/checkbox';
import { Label } from '@/src/components/shadcn/ui/label';

type ShadcnCheckboxProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const ShadcnCheckbox = ({
  label,
  value,
  onChange,
  ...rest
}: ShadcnCheckboxProps) => {
  return (
    <>
      <Label className="my-1 text-xs font-semibold tracking-wide text-gray-600 hover:text-gray-900 cursor-pointer">
        {label}
      </Label>
      <Checkbox checked={value} onCheckedChange={onChange} {...rest} />
    </>
  );
};

export default ShadcnCheckbox;
