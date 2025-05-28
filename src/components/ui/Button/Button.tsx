import React, { MouseEventHandler } from 'react';
import { cn } from '@src/utils/cn';

export type ButtonProps<T extends React.ElementType = 'button'> = React.ComponentProps<T> & {
  className?: string;
  inverted?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  as?: T;
  onClick?: MouseEventHandler;
  children?: React.ReactNode;
};

const Button = <T extends React.ElementType = 'button'>({
  as,
  inverted,
  children,
  className,
  ...props
}: ButtonProps<T>) => {
  const Btn = as || 'button';

  return (
    <Btn
      {...props}
      className={cn(
        'rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600',
        'ring ring-inset',
        'inline-flex flex-row items-center cursor-pointer appearance-none outline-0 whitespace-nowrap',
        inverted
          ? 'bg-white text-gray-900 ring-gray-300 hover:bg-transparent'
          : 'bg-sky-600 text-white ring-transparent hover:bg-sky-500',
        className
      )}
      type={props.type || 'button'}
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
