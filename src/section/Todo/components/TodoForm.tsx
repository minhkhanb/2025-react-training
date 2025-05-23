'use client';

import { MainForm, Form } from '@src/components/common/Form';
import * as z from 'zod';
import { Todo } from '@src/types/todo';
import {
  TitleField,
  DescriptionField,
  PriorityField,
  StatusField,
  DueDateField,
} from '@src/components/common/Field';
import { useState, useEffect } from 'react';

type TodoFormValues = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

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
  onSubmitAction: (values: TodoFormValues) => void;
}) => {
  const [formValues, setFormValues] = useState<TodoFormValues>(
    data || {
      title: '',
      description: '',
      status: 'pending',
      priority: 'low',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    }
  );

  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, [data]);

  return (
    <MainForm<TodoFormValues>
      defaultValues={formValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitAction}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-4">
          <Form.Field<TodoFormValues, string>
            name="title"
            component={TitleField}
            label="Title"
            required
          />

          <Form.Field<TodoFormValues, string>
            name="description"
            component={DescriptionField}
            label="Description"
            required
          />

          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <Form.Field<TodoFormValues, string>
                name="status"
                component={StatusField}
                label="Status"
                required
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' },
                ]}
              />
            </div>
            <div className="w-1/2">
              <Form.Field<TodoFormValues, string>
                name="priority"
                component={PriorityField}
                label="Priority"
                required
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                ]}
              />
            </div>
          </div>

          <Form.Field<TodoFormValues, Date>
            name="dueDate"
            component={DueDateField}
            label="Due Date"
            required
          />
        </div>

        <Form.SubmitButton>Save</Form.SubmitButton>
      </div>
    </MainForm>
  );
};
