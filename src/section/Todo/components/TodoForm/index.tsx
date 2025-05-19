'use client';

import { memo } from 'react';
import { TodoFormProps, TodoValue } from '@/section/Todo/types/ITodoList';
import { FormState, UseFormReturn } from 'react-hook-form';
import Button from '@/component/ui/Button';
import Form from '@/component/Form';
import * as yup from 'yup';
import Input from '@/component/ui/Input';

export const ToDoForm = memo(function TodoForm({
  todoSelectedValue,
  onSubmitAction,
  todoToUpdate,
  setTodoToUpdateAction,
  setTodoSelectedValue,
}: TodoFormProps) {
  // const onSubmit:
  //   | ((
  //       values: TodoValue,
  //       defaultValues?: TodoValue,
  //       formState?: FormState<TodoValue>,
  //       formHandlers?: UseFormReturn<TodoValue, unknown, TodoValue>
  //     ) => unknown)
  //   | undefined = (values, defaultValues, formState, formHandlers) => {
  //   if (todoToUpdate) {
  //     onSubmitAction({
  //       ...todoToUpdate,
  //       message: values.message as string,
  //     });

  //     formHandlers?.setValue('message', '');
  //   } else {
  //     const todoData: TodoValue = {
  //       id: Date.now().toString(),
  //       message: values.message as string,
  //       isFinish: false,
  //     };

  //     onSubmitAction(todoData);

  //     formHandlers?.reset();
  //   }
  // };

  type Todo = { message: string };

  const onSubmit = (
    values: Todo,
    defaultValues?:
      | {
          message?: string | undefined;
        }
      | undefined,
    formState?: FormState<Todo> | undefined,
    formHandlers?: UseFormReturn<Todo> | undefined
  ) => {
    if (todoToUpdate) {
      onSubmitAction({
        ...todoToUpdate,
        message: values.message,
      });

      formHandlers?.setValue('message', '');
    } else {
      const todoData: TodoValue = {
        id: Date.now().toString(),
        message: values.message,
        isFinish: false,
      };

      onSubmitAction(todoData);

      formHandlers?.reset();
    }
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
          message: todoSelectedValue ?? '',
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
              // onChange={e => {
              //   return console.log(e.target.value);
              // }}
            />
          }
        />

        <Button label={todoToUpdate ? 'Update' : 'Add'} />
      </Form>

      {todoToUpdate && (
        <Button
          onClick={() => {
            setTodoToUpdateAction(null);

            setTodoSelectedValue('');
          }}
          label="Cancel"
        />
      )}
    </div>
  );
});
