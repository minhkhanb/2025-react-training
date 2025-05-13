import React, { useState } from 'react';
import { Option } from '../Select';

interface Props {
  options: Option[];
  className?: string;
  onChange?: (value: string) => void;
}

const Radio = ({ onChange, options }: Props) => {
  const [currentValue, setCurrentValue] = useState<string>('');

  const handleChange = (value: string) => {
    setCurrentValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <fieldset>
      <div className="flex items-center gap-6">
        {options.map((option, index) => (
          <label className="text-sm flex items-center gap-2" key={option.value + index}>
            <input
              type="radio"
              name="gender"
              value={option.value}
              checked={currentValue === option.value}
              onChange={() => handleChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default Radio;
