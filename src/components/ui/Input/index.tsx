import React from 'react';
import { withProperties } from '@src/utils/types';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.Ref<HTMLInputElement>;
  value?: string;
}

const Input = ({ inputRef, value, ...props }: InputProps) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
  console.log('PDebug Input: ', inputRef, value, props);

>>>>>>> 96ca764 (form with generic)
=======
>>>>>>> f648f87 (Remove extra code)
  return (
    <div>
      <input
        type="text"
        autoComplete="given-name"
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        {...props}
        ref={inputRef}
        onChange={evt => props.onChange && props.onChange(evt)}
        value={value ?? ''}
      />
    </div>
  );
};

export default withProperties(Input, {});
