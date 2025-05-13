'use client';

import React from 'react';
import { FormState, UseFormReturn } from 'react-hook-form';
// import { IFormInput } from '../../types/IFormInput';
import { ToastType } from '@/component/Toast/types/IToast';
import { useToast } from '@/component/Toast/hooks/useToast';
import Button from '@/component/ui/Button';
import Form from '@/component/Form';
import * as yup from 'yup';
import Input from '@/component/ui/Input';
import Dropdown from '@/component/ui/Dropdown';

export default function TestForm() {
  const { showToast } = useToast();

  const onSubmit:
    | ((
        values: Record<string, unknown>,
        defaultValues?: Record<string, unknown>,
        formState?: FormState<Record<string, unknown>>,
        formHandlers?: UseFormReturn<
          Record<string, unknown>,
          unknown,
          {
            [x: string]: unknown;
          }
        >
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

  // console.log(Form.FormField);

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        firstName: '',
        lastName: '',
        iceCreamType: {
          value: '',
        },
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

      <Button onClick={() => showToast('Submit!', ToastType.SUCCESS)} label="Submit" />
    </Form>
  );
}
