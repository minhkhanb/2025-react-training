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
        'inline-flex flex-row items-center cursor-pointer appearance-none outline-0 whitespace-nowrap',
        props.className
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
  <Button {...props} className={cn('hover:shadow-md', className)}>
    {children}
    {inverted}
  </Button>
);

export default Button;
