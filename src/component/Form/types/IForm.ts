import { FieldValues, FormState, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

export enum SubmitMode {
  onSubmitButton = 'onSubmitButton',
  onChangeDebounced = 'onChangeDebounced',
}

export interface FormProps<TValues extends FieldValues = FieldValues> {
  className?: string;
  children: React.ReactNode;
  submitMode?: SubmitMode;
  onSubmit?: (
    values: TValues,
    defaultValues?: TValues,
    formState?: FormState<TValues>,
    formHandlers?: UseFormReturn<TValues, unknown, TValues>
  ) => unknown;
  validationSchema?: yup.Lazy<unknown> | yup.ObjectSchema<TValues>;
  defaultValues?: TValues;
  mode?: 'onBlur' | 'onSubmit' | 'onChange';
  showUnsavedChangesDialog?: boolean;
}

export interface FormOptions<TValues extends FieldValues = FieldValues> {
  submitMode?: SubmitMode;
  onSubmit?: (
    values: React.FormEvent<HTMLFormElement>,
    defaultValues?: TValues,
    formState?: FormState<TValues>,
    formHandlers?: UseFormReturn<TValues, unknown, TValues>
  ) => unknown;
  formId: string;
}

export interface FormFieldProps {
  name: string;
  child: React.ReactElement<{ error?: string; onChange?: (e: unknown) => void }>;
}
