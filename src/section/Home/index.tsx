'use client';

import ToastButton from '@/src/components/providers/Toast/ToastButton';
import { ToastButtonTypes } from '@/src/@types/toast.types';
import MainForm from '@/src/components/MainForm';
import { formSchema } from '../Form/Schema/schema';
import Input from '@/src/components/ui/InputField/Input';
import TextArea from '@/src/components/ui/InputField/TextArea';
import { FormField } from '@/src/components/ui/Form';
import Dropdown from '@/src/components/ui/InputField/Dropdown';
import Checkbox from '@/src/components/ui/InputField/Checkbox';
import FormButton from '@/src/components/ui/Form/Field/FormButton';
import { FieldValues, UseFormReturn } from 'react-hook-form';

const toastList: ToastButtonTypes[] = [
  { type: 'info', message: 'This is a toast notification info' },
  { type: 'error', message: 'This is a toast notification error' },
  { type: 'warning', message: 'This is a toast notification warning' },
  {
    type: 'success',
    title: 'Toast title',
    message: 'This is a toast notification success',
    duration: 500000,
  },
];

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

export default function Home() {
  const onSubmit = <T extends FieldValues>(
    data: T,
    methods: UseFormReturn<T>
  ) => {
    console.log('Form data:', data);
    methods.reset();
  };

  return (
    <>
      <div className="flex flex-col gap-4 py-12 justify-center items-center">
        <div className="font-bold">Welcome to Toaster</div>
        {toastList.map(({ type, message, title, duration }, i) => (
          <ToastButton
            key={i}
            type={type}
            message={message}
            title={title}
            duration={duration}
          />
        ))}
      </div>
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
                id="firstName"
                placeholder="First Name"
                component={Input}
              />

              <FormField
                name="email"
                label="Email"
                id="email"
                placeholder="example@gmail.com"
                component={Input}
              />

              <FormField
                name="message"
                id="message"
                label="Your Message"
                placeholder="Type your message here..."
                component={TextArea}
              />

              <FormField
                name="phone"
                id="phone"
                label="Phone (optional)"
                placeholder="+84 (___) ___-____"
                type="tel"
                className="max-w-42 w-full"
                component={Input}
              />

              <FormField
                name="role"
                id="role"
                label="Select Role"
                options={options}
                component={Dropdown}
              />

              <FormField
                name="consent"
                id="consent"
                type="checkbox"
                label="I agree to the processing of my personal data"
                component={Checkbox}
              />

              <FormButton type="submit" label="Send" />
            </>
          </div>
        </div>
      </MainForm>
    </>
  );
}
