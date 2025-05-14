'use client';

import { TodoFormProps, TodoValue } from '@/section/Todo/types/ITodoList';
import { FormState, UseFormReturn } from 'react-hook-form';
import Button from '@/component/ui/Button';
import Form from '@/component/Form';
import * as yup from 'yup';
import Input from '@/component/ui/Input';
import AddTodoFormFields from '../AddTodoFormFields';
import { memo } from 'react';

export const ToDoForm = memo(function TodoForm({
  todoSelectedValue,
  onSubmitAction,
  todoToUpdate,
  setTodoToUpdateAction,
  setTodoSelectedValue,
}: TodoFormProps) {
  const onSubmit:
    | ((
        values: Record<string, unknown>,
        defaultValues?: Record<string, unknown>,
        formState?: FormState<Record<string, unknown>>,
        formHandlers?: UseFormReturn<
          Record<string, unknown>,
          unknown,
          {
            [x: string]: unknown;
          }
        >
      ) => unknown)
    | undefined = (values, defaultValues, formState, formHandlers) => {
    if (todoToUpdate) {
      onSubmitAction({
        ...todoToUpdate,
        message: values.message as string,
      });
    } else {
      const todoData: TodoValue = {
        id: Date.now().toString(),
        message: values.message as string,
        isFinish: false,
      };

      onSubmitAction(todoData);
    }

    formHandlers?.reset();

    setTodoToUpdateAction(null);
  };

  const schema = yup
    .object({
      message: yup.string().required(),
    })
    .required();

  return (
    <div className="flex items-center rounded-t-xl border-b border-gray-200 bg-white p-6">
      <Form
        onSubmit={onSubmit}
        defaultValues={{
          message: '',
        }}
        validationSchema={schema}
        // mode="onChange"
        className="flex w-full"
      >
        <Form.FormField
          name={'message'}
          child={
            <Input
              // label="message"
              placeholder="Enter your task"
              onChange={e => {
                return console.log(e.target.value);
              }}
            />
          }
        />
        <Button label={todoToUpdate ? 'Update' : 'Add'} />
        <AddTodoFormFields
          todoSelectedValue={todoSelectedValue}
          todoToUpdate={todoToUpdate}
          setTodoToUpdateAction={setTodoToUpdateAction}
          setTodoSelectedValue={setTodoSelectedValue}
        />
      </Form>
    </div>
  );
});
