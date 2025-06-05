import React from 'react';
import FormButton from './FormButton';
import { useFormContext } from 'react-hook-form';
import FieldError from './FieldError'; // import mới
import Input from '../../InputField/Input';
import Checkbox from '../../InputField/Checkbox';
import TextArea from '../../InputField/TextArea';
import Dropdown from '../../InputField/Dropdown';

const options = [
  { value: '', label: 'Select role' },
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

const ValidationForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Input
        label="First Name"
        id="firstName"
        {...register('firstName')}
        placeholder="First Name"
      />
      <FieldError errors={errors} name="firstName" />

      <Input
        label="Email"
        id="email"
        {...register('email')}
        placeholder="example@gmail.com"
      />
      <FieldError errors={errors} name="email" />

      <TextArea
        id="message"
        label="Your Message"
        {...register('message')}
        placeholder="Type your message here..."
      />
      <FieldError errors={errors} name="message" />

      <Input
        id="phone"
        {...register('phone')}
        name="phone"
        label="Phone (optional)"
        placeholder="+84 (___) ___-____"
        type="tel"
        className="max-w-42 w-full"
      />
      <FieldError errors={errors} name="phone" />

      <Dropdown
        id="role"
        label="Select Role"
        {...register('role')}
        options={options}
      />
      <FieldError errors={errors} name="role" />

      <Checkbox
        id="consent"
        label="I agree to the processing of my personal data"
        {...register('consent')}
      />
      <FieldError errors={errors} name="consent" />

      <FormButton type="submit" label="Send" />
    </>
  );
};

export default ValidationForm;
