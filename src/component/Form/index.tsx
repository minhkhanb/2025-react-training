'use client';

import React, { useEffect, useId, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DefaultValues, FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { FormProps, SubmitMode } from './types/IForm';
import FormField from './components/FormField';
import { withProperties } from '@/utils/types';
import { FormOptionsContext } from './hooks/useFormContextSave';
import * as yup from 'yup';

function Form<T extends FieldValues>({
  mode,
  validationSchema,
  submitMode = SubmitMode.onSubmitButton,
  defaultValues = {} as T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showUnsavedChangesDialog: _,
  children,
  ...props
}: FormProps<T>) {
  const formHandlers = useForm({
    mode,
    resolver: validationSchema ? yupResolver(validationSchema as yup.ObjectSchema<T>) : undefined,
    defaultValues: defaultValues as DefaultValues<T> | undefined,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const formId = useId();

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
          await props.onSubmit(
            values as T,
            defaultValues,
            formHandlers.formState,
            formHandlers as UseFormReturn<T, unknown, T>
          );
        }
      } catch (err) {
        console.log('PDebug err debug: ', err);
      }
    })(evt);
  };

  useEffect(() => {
    formHandlers.reset(defaultValues);
  }, [defaultValues, formHandlers]);

  return (
    <FormOptionsContext.Provider value={{ submitMode, onSubmit, formId }}>
      <FormProvider {...formHandlers}>
        <form {...props} id={formId} ref={formRef} onSubmit={onSubmit} className={props.className}>
          {children}
        </form>
      </FormProvider>
    </FormOptionsContext.Provider>
  );
}

export default withProperties(Form, { FormField });
