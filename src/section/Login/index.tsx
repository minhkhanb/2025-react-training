'use client';

import React, { useEffect, useMemo } from 'react';
import { OnSubmitArgs } from '@/components/Form/types/IForm';
import { LoginValues } from './types/ILogin';
import * as yup from 'yup';
import Form from '@/components/Form';
import MyButton from '@/components/ui/MyButton';
import Input from '@/components/ui/Input';
import { useLoginUser } from './hooks/useLoginUser';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Login() {
  const loginUser = useLoginUser();

  const router = useRouter();

  // const data = useAuthStore.getState()._id;
  // const data1 = useAuthStore.getState().email;
  // const data2 = useAuthStore.getState().phoneNumber;
  // const data3 = useAuthStore.getState().username;
  const accessToken = useAuthStore.getState().accessToken;

  useEffect(() => {
    console.log('Access Token:', accessToken);

    // if (accessToken) {
    //   router.push('/');
    // }
  }, [accessToken, router]);

  // console.log('Auth Store Data:', {
  //   _id: data,
  //   email: data1,
  //   phoneNumber: data2,
  //   username: data3,
  //   accessToken: data4,
  // });

  const onSubmit = (...args: OnSubmitArgs<LoginValues>): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [values, defaultValues, formState, formHandlers] = args;

    // console.log(values);
    loginUser.mutate({
      email: values.email,
      password: values.password,
    });
  };

  const defaultValues: LoginValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    []
  );

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    })
    .required();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <Form
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        validationSchema={schema}
        // mode="onChange"
        className="flex w-1/2 flex-col items-center justify-center gap-4"
      >
        <Form.FormField
          name={'email'}
          child={
            <Input
              placeholder="Email"
              // onChange={e => {
              //   return console.log(e.target.value);
              // }}
            />
          }
        />

        <Form.FormField
          name={'password'}
          child={
            <Input
              placeholder="Password"
              type="password"
              // onChange={e => {
              //   return console.log(e.target.value);
              // }}
            />
          }
        />

        <MyButton label={'login'} />
      </Form>
    </div>
  );
}
