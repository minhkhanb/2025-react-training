import { createContext, useContext } from 'react';
import { FormOptions } from '../types/IForm';

export const FormOptionsContext = createContext<FormOptions>({} as FormOptions);

export function useFormContextSafe() {
  const context = useContext(FormOptionsContext);

  if (!context) {
    throw new Error('FormField must be used within a Form');
  }

  return context;
}
