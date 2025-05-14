import React from 'react';
import Form, { FormProps } from '@src/components/ui/Form';
import { FieldValues } from 'react-hook-form';

const MainForm = <T extends FieldValues>({ children, ...props }: FormProps<T>) => {
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

export default MainForm;
