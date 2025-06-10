'use client';

import MainForm from '@/src/components/MainForm';
import { FormField } from '@/src/components/ui/Form';
import FormButton from '@/src/components/ui/Form/Field/FormButton';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { formSchema } from './schema';
import Input from '@/src/components/ui/InputField/Input';
import TextArea from '@/src/components/ui/InputField/TextArea';
import Dropdown from '@/src/components/ui/InputField/Dropdown';
import Checkbox from '@/src/components/ui/InputField/Checkbox';

const defaultValues = {
  firstName: '',
  email: '',
  message: '',
  phone: '',
  role: '',
  consent: false,
};

const options = [
  { value: '', label: 'Select role' },
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

const ContactForm = () => {
  const onSubmit = <T extends FieldValues>(
    data: T,
    methods: UseFormReturn<T>
  ) => {
    console.log('Form data:', data);
    methods.reset();
  };
  return (
    <MainForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      validationSchema={formSchema}
    >
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <div className="mb-8">
            <h2 className="text-2xl text-black font-serif font-bold tracking-wide mb-1">
              Contact Us
            </h2>
          </div>
          <>
            <FormField
              name="firstName"
              label="First Name"
              placeholder="First Name"
              component={Input}
            />

            <FormField
              name="email"
              label="Email"
              placeholder="example@gmail.com"
              component={Input}
            />

            <FormField
              name="message"
              label="Your Message"
              placeholder="Type your message here..."
              component={TextArea}
            />

            <FormField
              name="phone"
              label="Phone (optional)"
              placeholder="+84 (___) ___-____"
              type="tel"
              className="max-w-42 w-full"
              component={Input}
            />

            <FormField
              name="role"
              label="Select Role"
              options={options}
              component={Dropdown}
            />

            <FormField
              name="consent"
              type="checkbox"
              label="I agree to the processing of my personal data"
              component={Checkbox}
            />

            <FormButton type="submit" label="Send" />
          </>
        </div>
      </div>
    </MainForm>
  );
};

export default ContactForm;
