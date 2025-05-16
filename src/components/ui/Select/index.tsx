import { cn } from '@src/utils/cn';
import React from 'react';

export interface Option {
  label: string;
  value: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  className?: string;
}

const Select = ({ options, className = '', ...props }: Props) => {
  return (
    <select
      className={cn(
        'w-full focus:outline-0 h-10 rounded-md border-[1px] border-[#dfdfdf] px-2 text-sm',
        className
      )}
      {...props}
    >
      {options.map((item, index) => (
        <option key={item.value + index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
