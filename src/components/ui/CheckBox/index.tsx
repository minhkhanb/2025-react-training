import React from 'react';

interface Props {
  label: string;
  value: string;
  className?: string;
  onChange?: (values: string) => void;
  checked?: boolean;
}

const CheckBox = ({ onChange, label, value, checked = false }: Props) => {
  return (
    <label className="text-sm flex items-center gap-2">
      <input
        type="checkbox"
        name="gender"
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
      />
      {label}
    </label>
  );
};

export default CheckBox;
