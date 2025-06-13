'use client';

import { Form, MainForm } from '@src/components/common/Form';
import * as z from 'zod';
import { InputField } from '@src/components/ui';
import Link from 'next/link';
import { RegisterRequest } from '@src/types/auth';
import { register } from '@src/app/api/auth/route';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { toastManager } from '@src/modules/toast';
import { useRouter } from 'next/navigation';

type RegisterFormValues = RegisterRequest & {
  confirmPassword: string;
};

const validationSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    name: z.string().min(1, 'Name is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Confirm password is required')
      .min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: (values: RegisterFormValues) => {
      const { confirmPassword: _confirmPassword, ...registerData } = values;
      return register(registerData);
    },
    onSuccess: () => {
      toastManager.addToast('Success', 'Registered successfully', 'success');
      router.push('/login');
    },
    onError: error => {
      toastManager.addToast('Register failed', error.message, 'error');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>

        <MainForm
          defaultValues={{
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
          className="mt-8 space-y-6"
        >
          <div className="space-y-4">
            <Form.Field
              name="email"
              component={InputField}
              label="Email"
              placeholder="Enter email"
              required
            />
            <Form.Field
              name="name"
              component={InputField}
              label="Name"
              placeholder="Enter name"
              required
            />
            <div className="relative">
              <Form.Field
                name="password"
                component={InputField}
                label="Password"
                placeholder="Enter password"
                type={showPassword ? 'text' : 'password'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-3 top-[34px] text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="relative">
              <Form.Field
                name="confirmPassword"
                component={InputField}
                label="Confirm Password"
                placeholder="Enter confirm password"
                type={showPassword ? 'text' : 'password'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-3 top-[34px] text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Form.SubmitButton
            loading={isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </Form.SubmitButton>
        </MainForm>
      </div>
    </div>
  );
}
