import Checkbox from '../../InputField/Checkbox';

type CustomCheckboxProps = {
  label: string;
  value: boolean;
};

const CustomCheckbox = ({ label, value, ...rest }: CustomCheckboxProps) => {
  return <Checkbox checked={value} label={label} {...rest} />;
};

export default CustomCheckbox;
