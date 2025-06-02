import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  cols?: number;
  rows?: number;
}

const TextArea = ({ placeholder, cols = 10, rows = 5, ...props }: Props) => {
  return (
    <textarea
      placeholder={placeholder}
      {...props}
      onChange={e => {
        if (props.onChange) {
          props.onChange(e);
        }
      }}
      cols={cols}
      rows={rows}
      className="w-full focus:outline-0 py-2 rounded-md border-[1px] border-[#dfdfdf] px-2 text-sm"
    />
  );
};

export default TextArea;
