import React, { useState } from 'react';
import { Option } from '../Select';

interface Props {
  options: Option[];
  className?: string;
  onChange?: (values: string[]) => void;
}

const CheckBox = ({ onChange, options }: Props) => {
  const [values, setValues] = useState<string[]>([]);

  const handleChange = (value: string) => {
    const updated = values.includes(value)
      ? values.filter(item => item !== value)
      : [...values, value];

    setValues(updated);
    onChange?.(updated);
  };

  return (
    <fieldset>
      <div className="flex items-center gap-6">
        {options.map((option, index) => (
          <label className="text-sm flex items-center gap-2" key={option.value + index}>
            <input
              type="checkbox"
              name="gender"
              value={option.value}
              checked={values.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckBox;
