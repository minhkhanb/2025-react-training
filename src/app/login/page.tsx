'use client';

import { Form, MainForm } from '@src/components/common/Form';
import * as z from 'zod';
import { CheckBoxField, InputField } from '@src/components/ui';
import Link from 'next/link';
import { LoginRequest } from '@src/types/auth';
import { logIn } from '@src/app/api/auth/route';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { toastManager } from '@src/modules/toast';
import { useRouter } from 'next/navigation';

const validationSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean(),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (values: LoginRequest) => logIn(values),
    onSuccess: () => {
      toastManager.addToast('Success', 'Logged in successfully', 'success');
      router.push('/dashboard');
    },
    onError: error => {
      toastManager.addToast('Login failed', error.message, 'error');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>

        <MainForm
          defaultValues={{
            email: '',
            password: '',
            rememberMe: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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
            <div className="flex items-center justify-between">
              <Form.Field name="rememberMe" component={CheckBoxField} placeholder="Remember me" />
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Form.SubmitButton
            loading={isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </Form.SubmitButton>
        </MainForm>
      </div>
    </div>
  );
}
