import { cn } from '@src/utils/cn';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className = '', ...props }: Props) => {
  return (
    <button
      {...props}
      className={cn(
        'w-full cursor-pointer text-white text-sm h-10 rounded-sm bg-blue-400',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
