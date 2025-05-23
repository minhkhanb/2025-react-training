'use client';

import React from 'react';
import { FormState, UseFormReturn } from 'react-hook-form';
import { IFormInput } from '../../types/IFormInput';
import { ToastType } from '@/components/Toast/types/IToast';
import { useToast } from '@/components/Toast/hooks/useToast';
import MyButton from '@/components/ui/MyButton';
import Form from '@/components/Form';
import * as yup from 'yup';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';

export default function TestForm() {
  const { showToast } = useToast();

  const onSubmit:
    | ((
        values: IFormInput,
        defaultValues?:
          | {
              firstName?: string | undefined;
              lastName?: string | undefined;
              iceCreamType?: string | undefined;
            }
          | undefined,
        formState?: FormState<IFormInput> | undefined,
        formHandlers?: UseFormReturn<IFormInput> | undefined
      ) => unknown)
    | undefined = (values, defaultValues, formState, formHandlers) => {
    console.log(values, defaultValues, formState, formHandlers);
  };

  const schema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      // age: yup.number().positive().integer().required(),
      iceCreamType: yup.string().required(),
    })
    .required();

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        firstName: '',
        lastName: '',
        iceCreamType: '',
      }}
      validationSchema={schema}
      // mode="onChange"
    >
      <Form.FormField
        name={'firstName'}
        child={
          <Input
            label="firstName"
            placeholder="Enter your first Name"
            onChange={e => {
              return console.log(e.target.value);
            }}
          />
        }
      />

      <Form.FormField
        name={'lastName'}
        child={<Input label="lastName" placeholder="Enter your last Name" />}
      />

      <Form.FormField
        name={'iceCreamType'}
        child={
          <Dropdown
            name="iceCreamType"
            label="Ice cream type"
            placeholder="Choose Ice cream type"
            options={[
              { label: 'Straw berry', value: 'strawBerry' },
              { label: 'Chocolate', value: 'chocolate' },
              { label: 'Blue berry', value: 'blueBerry', disabled: true },
            ]}
          />
        }
      />

      {/* <Form.FormField name={'submit'} child={} /> */}

      <MyButton onClick={() => showToast('Submit!', ToastType.SUCCESS)} label="Submit" />
    </Form>
  );
}
