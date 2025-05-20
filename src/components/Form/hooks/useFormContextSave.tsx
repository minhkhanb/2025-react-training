import { createContext, useContext } from 'react';
import { FormOptions } from '../types/IForm';
import { FieldValues } from 'react-hook-form';

export const FormOptionsContext = createContext<FormOptions<FieldValues> | unknown>({});

export function useFormContextSafe() {
  const context = useContext(FormOptionsContext);

  if (!context) {
    throw new Error('FormField must be used within a Form');
  }

  return context;
}
