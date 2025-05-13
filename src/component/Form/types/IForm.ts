import { FormState } from 'react-hook-form';
import * as yup from 'yup';

export enum SubmitMode {
  onSubmitButton = 'onSubmitButton',
  onChangeDebounced = 'onChangeDebounced',
}

export interface FormProps {
  className?: string;
  children: React.ReactNode;
  submitMode?: SubmitMode; // Specify when onSubmit is called.
  onSubmit?: (
    values: Record<string, unknown>,
    defaultValues?: Record<string, unknown>,
    formState?: FormState<Record<string, unknown>>,
    formHandlers?: unknown
  ) => unknown;
  validationSchema?: yup.Lazy<never> | yup.ObjectSchema<Record<string, unknown>>;
  defaultValues?: Record<string, unknown>;
  mode?: 'onBlur' | 'onSubmit' | 'onChange';
  showUnsavedChangesDialog?: boolean;
}

export interface FormOptions {
  submitMode?: SubmitMode;
  onSubmit?: (
    values: React.FormEvent<HTMLFormElement>,
    defaultValues?: Record<string, unknown>,
    formState?: FormState<Record<string, unknown>>,
    formHandlers?: unknown
  ) => unknown;
  formId: string;
}

export interface FormFieldProps {
  name: string;
  child: React.ReactElement<{ error?: string; onChange?: (e: unknown) => void }>;
}
