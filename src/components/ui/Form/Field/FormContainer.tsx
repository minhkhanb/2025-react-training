'use client';

import React from 'react';
import { InferType } from 'yup';
import FormWrapper from '@/src/components/ui/Form/FormWrapper';
import { formSchema } from '@/src/section/Form/Schema/schema';
import ValidationForm from './ValidationForm';

type FormData = InferType<typeof formSchema>;

const FormContainer: React.FC = () => {
  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 2000));
    console.log('Form data:', data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <div className="mb-8">
          <h2 className="text-2xl text-black font-serif font-bold tracking-wide mb-1">
            Contact Us
          </h2>
        </div>

        <FormWrapper onSubmit={onSubmit} validationSchema={formSchema}>
          <ValidationForm />
        </FormWrapper>
      </div>
    </div>
  );
};

export default FormContainer;
