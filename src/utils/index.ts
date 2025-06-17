import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ParamsProps } from '../@types/todo.types';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

export const filterValidParams = (params: ParamsProps) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== '' && value !== undefined
    )
  );
};
