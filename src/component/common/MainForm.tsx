'use client';

import React from 'react';
import { FormProps } from '../Form/types/IForm';
import Form from '../Form';
import { withProperties } from '@/utils/types';
import FormField from '../Form/components/FormField';
import { FieldValues } from 'react-hook-form';

const MainForm = ({ children, ...props }: FormProps<FieldValues>) => {
  return (
    <Form
      {...props}
      onSubmit={async (values, defaultValues, formState, formHandlers) => {
        try {
          if (props.onSubmit) {
            await props.onSubmit(values, defaultValues, formState, formHandlers);
          }
        } catch (err) {
          console.log('PDebug Form Error: ', err);
        }
      }}
    >
      {children}
    </Form>
  );
};

export default withProperties(MainForm, { FormField });
