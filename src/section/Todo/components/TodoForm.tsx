'use client';

import { MainForm, Form } from '@src/components/common/Form';
import * as z from 'zod';
import { Todo } from '@src/types/todo';
import { InputField, SelectField, TextareaField, DateField } from '@src/components/ui';

const validationSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must not exceed 100 characters')
    .regex(/^[a-zA-ZÀ-ỹ0-9\s]+$/, 'Title can only contain letters, numbers and spaces'),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),

  status: z.enum(['pending', 'in-progress', 'completed'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),

  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Invalid priority' }),
  }),

  dueDate: z
    .date({
      required_error: 'Due date is required',
      invalid_type_error: 'Invalid due date',
    })
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Due date must be from today onwards'),
});

export const TodoForm = ({
  data,
  onSubmitAction,
}: {
  data?: Todo;
  onSubmitAction: (values: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
}) => {
  return (
    <MainForm
      defaultValues={
        data || {
          title: '',
          description: '',
          status: 'pending',
          priority: 'low',
          dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
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
            required
          />

          <Form.Field
            name="description"
            component={TextareaField}
            label="Description"
            placeholder="Enter todo description"
            required
          />

          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <Form.Field
                name="status"
                component={SelectField}
                label="Status"
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' },
                ]}
                required
              />
            </div>
            <div className="w-1/2">
              <Form.Field
                name="priority"
                component={SelectField}
                label="Priority"
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                ]}
                required
              />
            </div>
          </div>

          <Form.Field
            name="dueDate"
            component={DateField}
            label="Due Date"
            placeholder="Pick a date"
            required
          />
        </div>

        <Form.SubmitButton>Save</Form.SubmitButton>
      </div>
    </MainForm>
  );
};
