/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, MouseEventHandler } from 'react';
import { cn } from '@src/utils/cn';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  inverted?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  as?: React.FunctionComponent | string;
  onClick?: MouseEventHandler;
  children?: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({ as = 'button', children, ...props }) => {
  const Btn = as as any;

  return (
    <Btn
      {...props}
      type={props.type || 'button'}
      className={cn(
        'rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-sky-500',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600',
        'ring ring-inset',
        'inline-flex flex-row items-center cursor-pointer appearance-none outline-0 whitespace-nowrap',
        props.className,
        props.inverted
          ? 'bg-white text-gray-900 ring-gray-300'
          : 'bg-sky-600 text-white ring-transparent'
      )}
    >
      {children}
    </Btn>
  );
};

export const BlueRounded: React.FunctionComponent<ButtonProps> = ({
  inverted,
  className,
  children,
  ...props
}) => (
  <Button inverted={inverted} {...props} className={cn('hover:shadow-md', className)}>
    {children}
  </Button>
);

export default Button;
