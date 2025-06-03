'use client';

import { MainForm, Form } from '@src/components/common/Form';
import * as z from 'zod';
import { Todo } from '@src/types/todo';
import { CheckBoxField, InputField } from '@src/components/ui';

const validationSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .regex(/^[a-zA-ZÀ-ỹ0-9\s]+$/, 'Title can only contain letters, numbers and spaces'),

  completed: z.boolean(),
});

export const TodoForm = ({
  data,
  onSubmitAction,
  loading,
}: {
  data?: Todo;
  onSubmitAction: (values: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  loading?: boolean;
}) => {
  return (
    <MainForm
      defaultValues={
        data || {
          title: '',
          completed: false,
        }
      }
      validationSchema={validationSchema}
      onSubmit={onSubmitAction}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-4">
          <Form.Field
            name="title"
            component={InputField}
            label="Title"
            placeholder="Enter todo title"
            autoFocus={true}
            required
          />
        </div>

        {data && (
          <div className="grid grid-cols-1 gap-4">
            <Form.Field name="completed" component={CheckBoxField} placeholder="Completed" />
          </div>
        )}
        <Form.SubmitButton loading={loading}>Save</Form.SubmitButton>
      </div>
    </MainForm>
  );
};
