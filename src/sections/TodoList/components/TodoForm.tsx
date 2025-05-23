'use client';

import { MainForm, Form } from '@src/components/Form';
import { validationSchema } from '@src/sections/TodoList/schema';
import { Todo } from '@src/types/todo';
import {
  TitleField,
  DescriptionField,
  PriorityField,
  StatusField,
  DueDateField,
} from '@src/components/Field';
import { useState, useEffect } from 'react';

type TodoFormValues = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

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
