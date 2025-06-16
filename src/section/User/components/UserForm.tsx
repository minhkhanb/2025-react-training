'use client';

import { MainForm, Form } from '@src/components/common/Form';
import * as z from 'zod';
import { InputField } from '@src/components/ui';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { RegisterRequest } from '@src/types/auth';
import { User } from '@src/types/user';

const validationSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export const UserForm = ({
  data,
  onSubmitAction,
  loading,
}: {
  data?: User;
  onSubmitAction: (values: RegisterRequest) => void;
  loading?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MainForm
      defaultValues={
        data || {
          email: '',
          name: '',
          password: '',
        }
      }
      validationSchema={validationSchema}
      onSubmit={onSubmitAction}
      className="p-4 space-y-6"
    >
      <div className="space-y-4">
        <Form.Field
          name="name"
          component={InputField}
          label="Name"
          placeholder="Enter name"
          autoFocus={true}
          required
        />
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
      </div>

      <Form.SubmitButton
        loading={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {data ? 'Update' : 'Add'}
      </Form.SubmitButton>
    </MainForm>
  );
};
