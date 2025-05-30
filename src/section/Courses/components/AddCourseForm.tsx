'use client';

import MainForm from '@src/components/common/MainForm';
import { Form, Input } from '@src/components/ui';
import * as yup from 'yup';
import { useCreateUser } from '@src/api/user/mutations';
import { CreateUserRequest, User } from '@src/api/user';

type UserFields = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

const defaultValues: UserFields = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().min(5).max(50).required('User name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6).max(100).required('Password is required'),
});

const AddCourseForm = () => {
  const { mutateAsync: createCourseMutate, isPending } = useCreateUser();

  const createCoursePayload = (values: UserFields): CreateUserRequest => {
    const { name, email, password } = values;

    return {
      name,
      email,
      password,
    };
  };

  const onSubmit = async (values: UserFields) => {
    const payload: CreateUserRequest = createCoursePayload(values);
    await createCourseMutate({ payload });
  };

  return (
    <MainForm defaultValues={defaultValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <div className="space-y-12">
        <div className="pb-6">
          <h2 className="text-base/7 font-semibold text-gray-900">Add New User</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-1">
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Name" />
              <div className="mt-2">
                <Form.Field component={Input} name="name" placeholder="User name" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Email" />
              <div className="mt-2">
                <Form.Field component={Input} name="email" placeholder="Email address" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Password" />
              <div className="mt-2">
                <Form.Field component={Input} name="password" placeholder="Password" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Form.SubmitButton submitting={isPending} className="w-full sm:w-auto">
          Add Course
        </Form.SubmitButton>
      </div>
    </MainForm>
  );
};

export default AddCourseForm;
