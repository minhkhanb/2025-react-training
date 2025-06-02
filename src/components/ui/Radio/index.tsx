import React from 'react';

interface Props {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  checked?: boolean;
}

const Radio = ({ onChange, label, value, checked = false }: Props) => {
  return (
    <label className="text-sm flex items-center gap-2">
      <input
        type="radio"
        name="gender"
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
      />
      {label}
    </label>
  );
};

export default Radio;
