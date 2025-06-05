'use client';

import React from 'react';
import FormWrapper from '@/src/components/providers/Form/FormWrapper';
import Input from '@/src/components/providers/Form/Field/Input';
import Dropdown from '@/src/components/providers/Form/Field/Dropdown';
import { formSchema } from '@/src/components/providers/Form/Schema/schema';
import { InferType } from 'yup';
import TextArea from './TextArea';
import Checkbox from './Checkbox';
import FormButton from './FormButton';

type FormData = InferType<typeof formSchema>;

const options = [
  { value: '', label: 'Select role' },
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

const MyForm: React.FC = () => {
  const onSubmit = async (data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
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
          <Input label="First Name" name="firstName" placeholder="First name" />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="example@mail.com"
          />
          <TextArea
            label="Your Message"
            name="message"
            placeholder="Type your message here..."
          />
          <Dropdown name="role" label="Select Role" options={options} />
          <Input
            name="phone"
            type="tel"
            label="Phone (optional)"
            placeholder="+84 (___) ___-____"
            className="max-w-42 w-full"
          />
          <Checkbox
            name="consent"
            label="I agree to the processing of my personal data"
            required
          />
          <FormButton type="submit" label="Send" />
        </FormWrapper>
      </div>
    </div>
  );
};

export default MyForm;
