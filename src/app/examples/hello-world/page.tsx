'use client';

import { toast } from '@src/modules/toast';
import MainForm from '@src/components/common/MainForm';
import React, { useRef } from 'react';
import { Button, Form, Input } from '@src/components/ui';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().required(),
});

export default function HelloWorld() {
  const firstNameRef = useRef<HTMLInputElement>(null);

  const onSuccess = () => {
    toast({
      title: 'Success',
      message: 'Feature known to be disabled, performing immediate cleanup',
      type: 'success',
      duration: 3000,
    });
  };

  const onError = () => {
    toast({
      title: 'Error',
      message: 'Feature known to be disabled, performing immediate cleanup',
      type: 'error',
      duration: 3000,
    });
  };

  const defaultValues = {
    firstName: '',
    lastName: '',
  };

  return (
    <div className="mx-auto max-w-2xl">
      <MainForm
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={async values => console.log('PDebug submit with values: ', values)}
      >
        <div className="pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Form.FieldLabel title="First name" />
              <Form.Field inputRef={firstNameRef} name="firstName" component={Input} />
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Last name" />
              <Form.Field name="lastName" placeholder="Last name" component={Input} />
            </div>
          </div>
        </div>
        <Button.Submit>Save Changes</Button.Submit>
        <Form.SubmitButton />
        <Button.BlueRounded inverted>Test Button</Button.BlueRounded>
      </MainForm>
      <div>
        <button className="btn btn--success" onClick={onSuccess}>
          Show Success
        </button>
        <button className="btn btn-error" onClick={onError}>
          Show Error
        </button>
      </div>
    </div>
  );
}
