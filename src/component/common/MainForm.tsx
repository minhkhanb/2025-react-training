'use client';

import React from 'react';
import { FormProps } from '../Form/types/IForm';
import Form from '../Form';
import { withProperties } from '@/utils/types';
import FormField from '../Form/components/FormField';

const MainForm = ({ children, ...props }: FormProps) => {
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
