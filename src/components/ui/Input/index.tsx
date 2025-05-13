import React, { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ placeholder, ...rest }, ref) => {
  console.log(rest);
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      {...rest}
      onChange={e => {
        if (rest.onChange) {
          rest.onChange(e);
        }
      }}
      className="w-full focus:outline-0 h-10 rounded-md border-[1px] border-[#dfdfdf] px-2 text-sm"
    />
  );
});

Input.displayName = 'Input';

export default Input;
