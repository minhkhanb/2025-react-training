'use client';

import { toast } from '@src/modules/toast';
import MainForm from '@src/components/common/MainForm';
import React from 'react';

export default function HelloWorld() {
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

  return (
    <div>
      <MainForm onSubmit={async values => console.log('PDebug submit with values: ', values)}>
        <div>Implement Form</div>
        <input type="submit" className="border" />
      </MainForm>
      <h1>Hello World</h1>
      <p>This is a simple example of a Next.js page.</p>
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
