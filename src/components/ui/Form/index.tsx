/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useId, useRef } from 'react';
import { withProperties } from '@src/utils/types';
import {
  Controller,
  DefaultValues,
  FieldValues,
  FormProvider,
  FormState,
  useForm,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@src/utils/cn';
import { useDebouncedCallback } from '@src/composables/useDebouncedCallback';
import { ErrorMessage } from '@hookform/error-message';
import { createPortal } from 'react-dom';
import Button from '@src/components/ui/Button';

yup.setLocale({
  mixed: {
    default: 'This field is invalid.',
    required: 'This field is required.',
  },
  string: {
    email: 'Please provide a valid email address.',
    url: 'Please provide a valid URL.',
  },
});

enum SubmitMode {
  onSubmitButton = 'onSubmitButton',
  onChangeDebounced = 'onChangeDebounced',
}

export interface FormProps<T extends FieldValues> {
  className?: string;
  children?: any;
  submitMode?: SubmitMode; // Specify when onSubmit is called.
  onSubmit?: (
    values: T,
    defaultValues?: DefaultValues<T>,
    formState?: FormState<T>,
    formHandlers?: UseFormReturn<T>
  ) => any;
  validationSchema?: yup.Lazy<any> | yup.ObjectSchema<any>;
  defaultValues?: DefaultValues<T>;
  mode?: 'onBlur' | 'onSubmit' | 'onChange';
  showUnsavedChangesDialog?: boolean;
}

interface FormOptions<T extends FieldValues> {
  submitMode?: SubmitMode;
  onSubmit?: (
    values: T,
    defaultValues?: DefaultValues<T>,
    formState?: FormState<T>,
    formHandlers?: UseFormReturn<T>
  ) => any;
  formId: string;
}

interface FieldLabelProps {
  title: any;
  className?: string;
}

const FormOptionsContext = React.createContext<FormOptions<FieldValues> | any>({});

const Form = <T extends FieldValues>({
  mode = 'onSubmit',
  validationSchema,
  submitMode = SubmitMode.onSubmitButton,
  defaultValues,
  showUnsavedChangesDialog: _,
  children,
  ...props
}: FormProps<T>) => {
  const formHandlers = useForm<T>({
    mode,
    resolver: validationSchema && yupResolver(validationSchema),
    defaultValues,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [formId] = useId();

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    if (evt) {
      if (typeof evt.preventDefault === 'function') {
        evt.preventDefault();
      }

      if (typeof evt.stopPropagation === 'function') {
        // Prevent any outer forms from receiving the submit event
        evt.stopPropagation();
      }
    }

    return formHandlers.handleSubmit(async values => {
      try {
        if (props.onSubmit) {
          await props.onSubmit(values, defaultValues, formHandlers.formState, formHandlers);
        }
      } catch (err) {
        console.log('PDebug err debug: ', err);
      }
    })(evt);
  };

  return (
    <FormOptionsContext.Provider value={{ submitMode, onSubmit, formId }}>
      <FormProvider {...formHandlers}>
        <form {...props} id={formId} ref={formRef} onSubmit={onSubmit}>
          {children}
        </form>
      </FormProvider>
    </FormOptionsContext.Provider>
  );
};

Form.FieldLabel = ({ title, className }: FieldLabelProps) => {
  return <div className={cn(`block text-sm/6 font-medium text-gray-900`, className)}>{title}</div>;
};

type FieldProps<T extends React.ElementType> = React.ComponentPropsWithRef<T> & {
  className?: string;
  inputRef?: React.Ref<any>;
  name: string;
  component: T;
  errors?: any;
  onChange?: (evt: any) => void;
  type?: string;
};

const Field = <T extends React.ElementType>({
  name,
  component: Component,
  errors,
  className,
  ...props
}: FieldProps<T>) => {
  const formHandlers = useFormContext();
  const contextErrors = formHandlers.formState.errors;

  return (
    <div className={cn('flex flex-col mb-4', className)}>
      <FieldInput {...props} name={name} component={Component} onChange={props.onChange} />
      {props.type !== 'hidden' && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => {
            message = message || contextErrors[name]?.message?.toString() || '';

            return <p className="text-sm/6 text-red-500">{message}</p>;
          }}
        />
      )}
    </div>
  );
};

const FieldInput = <T extends React.ElementType>({
  component: Component,
  inputRef,
  ...props
}: FieldProps<T>) => {
  const { onSubmit, submitMode } = React.useContext(FormOptionsContext);
  const formHandlers = useFormContext();

  const onSubmitDebounced = useDebouncedCallback(async () => {
    if (submitMode === SubmitMode.onChangeDebounced) {
      await onSubmit();
    }
  });

  const { control } = formHandlers;

  const onChange = (args: any[]) => {
    const evt = args[0];
    const data = args[1];
    let value;
    if (data) {
      value = data.value;
    } else {
      if (evt === undefined) return null;
      value = evt.target ? evt.target.value : evt;
    }
    console.log('PDebug onChange: ', args, evt, data, value);

    onSubmitDebounced();

    if (props.onChange) {
      props.onChange(value);
    }

    return value;
  };

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <Component
          {...field}
          onChange={(evt: any[]) => {
            field.onChange(evt);
            onChange(evt);
          }}
          {...(inputRef ? { inputRef } : {})}
        />
      )}
    />
  );
};

interface FormErrorMessageProps {
  className?: string;
  message?: string;
}

const FormErrorMessage: React.FunctionComponent = ({
  className,
  message = 'Please check required fields and errors in this form',
}: FormErrorMessageProps) => {
  const { formState } = useFormContext();
  const { errors } = formState;

  let errorMessage = '';

  if (Object.entries(errors).length > 0) {
    console.log('PDebug FormErrorMessage: ', errors, errorMessage);
    errorMessage = errors.root?.message || message;
  }

  if (!errorMessage) {
    return null;
  }

  return <div className={cn('text-sm/6 text-red-500', className)}>{errorMessage}</div>;
};

Form.Status = ({ className }: { className?: string }) => {
  return <div className={cn('', className)}>Changes saved!</div>;
};

interface SubmitButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  dirtyText?: string;
  cleanText?: string;
  children?: any;
  containerId?: string;
  className?: string;
  disabled?: boolean;
  hideOnClean?: boolean;
  button?: React.FunctionComponent;
  submitting?: boolean;
}

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  containerId,
  hideOnClean,
  submitting,
  ...props
}) => {
  const { formState } = useFormContext();

  const { isSubmitting, isDirty, isValid, isSubmitted } = formState;

  if (!isDirty && hideOnClean) {
    return null;
  }

  const disabled = props.disabled || isSubmitting || (!isDirty && !isValid && isSubmitted);
  const children = (
    <Button.Submit dirty={isDirty} submitting={isSubmitting || !submitting} disabled={disabled} />
  );

  if (containerId) {
    const el = document.getElementById(containerId);

    return el ? createPortal(children, el) : null;
  }

  return children;
};

export default withProperties(Form, {
  Field,
  FieldInput,
  ErrorMessage: FormErrorMessage,
  SubmitButton,
});
