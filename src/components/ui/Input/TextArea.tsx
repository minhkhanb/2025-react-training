import React from 'react';
import { Textarea as TextAreaCn } from '@src/components/shadcn/ui/textarea';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputRef?: React.Ref<HTMLTextAreaElement>;
  value?: string;
}

const TextArea = ({ inputRef, value, ...props }: TextAreaProps) => {
  return (
    <TextAreaCn
      {...props}
      ref={inputRef}
      onChange={evt => props.onChange && props.onChange(evt)}
      value={value ?? ''}
    />
  );
};

export default TextArea;
