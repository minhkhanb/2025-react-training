import { DefaultValues, FieldValues, FormState, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

export enum SubmitMode {
  onSubmitButton = 'onSubmitButton',
  onChangeDebounced = 'onChangeDebounced',
}

export interface FormProps<TValues extends FieldValues> {
  className?: string;
  children: React.ReactNode;
  submitMode?: SubmitMode;
  onSubmit?: (...args: OnSubmitArgs<TValues>) => unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: yup.Lazy<any> | yup.ObjectSchema<any>;
  defaultValues?: DefaultValues<TValues>;
  mode?: 'onBlur' | 'onSubmit' | 'onChange';
  showUnsavedChangesDialog?: boolean;
}

export interface FormOptions<TValues extends FieldValues> {
  submitMode?: SubmitMode;
  onSubmit?: (...args: OnSubmitArgs<TValues>) => unknown;
  formId: string;
}

export interface FormFieldProps {
  name: string;
  child: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (evt: any) => void;
  childProps?: Record<string, unknown>;
}

export type OnSubmitArgs<TValues extends FieldValues> = [
  values: TValues,
  defaultValues?: DefaultValues<TValues>,
  formState?: FormState<TValues>,
  formHandlers?: UseFormReturn<TValues>,
];
