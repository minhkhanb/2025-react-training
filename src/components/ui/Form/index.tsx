/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useId, useRef } from 'react';
import { withProperties } from '@src/utils/types';
import { FormProvider, FormState, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

enum SubmitMode {
  onSubmitButton = 'onSubmitButton',
  onChangeDebounced = 'onChangeDebounced',
}

export interface FormProps {
  className?: string;
  children: any;
  submitMode?: SubmitMode; // Specify when onSubmit is called.
  onSubmit?: (
    values: any,
    defaultValues?: any,
    formState?: FormState<any>,
    formHandlers?: any
  ) => any;
  validationSchema?: yup.Lazy<any> | yup.ObjectSchema<any>;
  defaultValues?: any;
  mode?: 'onBlur' | 'onSubmit' | 'onChange';
  showUnsavedChangesDialog?: boolean;
}

interface FormOptions {
  submitMode?: SubmitMode;
  onSubmit?: (
    values: any,
    defaultValues?: any,
    formState?: FormState<any>,
    formHandlers?: any
  ) => any;
  formId: string;
}

const FormOptionsContext = React.createContext<FormOptions>({} as FormOptions);

const Form = ({
  mode,
  validationSchema,
  submitMode = SubmitMode.onSubmitButton,
  defaultValues = {},
  showUnsavedChangesDialog: _,
  children,
  ...props
}: FormProps) => {
  const formHandlers = useForm({
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
          <input className="border" {...formHandlers.register('username')} />
        </form>
      </FormProvider>
    </FormOptionsContext.Provider>
  );
};

export default withProperties(Form, {});
