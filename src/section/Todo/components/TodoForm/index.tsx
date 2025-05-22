'use client';

import { memo, useMemo } from 'react';
import { TodoFormProps, TodoValue } from '@/section/Todo/types/ITodoList';
import Button from '@/components/ui/Button';
import Form from '@/components/Form';
import * as yup from 'yup';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { OnSubmitArgs } from '@/components/Form/types/IForm';

export const ToDoForm = memo(function TodoForm({ onSubmitAction, todoToUpdate }: TodoFormProps) {
  const router = useRouter();

  type Todo = { message: string };

  const onSubmit = (...args: OnSubmitArgs<Todo>): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [values, defaultValues, formState, formHandlers] = args;

    if (todoToUpdate) {
      onSubmitAction({
        ...todoToUpdate,
        message: values.message,
      });

      // formHandlers?.setValue('message', '');
    } else {
      const todoData: TodoValue = {
        id: Date.now().toString(),
        message: values.message,
        isFinish: false,
      };

      onSubmitAction(todoData);

      // formHandlers?.reset();
    }

    router.back();
  };

  const schema = yup
    .object({
      message: yup.string().required(),
    })
    .required();

  // console.log(todoSelectedValue);

  const defaultValues = useMemo(
    () => ({
      message: todoToUpdate?.message ?? '',
    }),
    [todoToUpdate]
  );

  return (
    <div className="flex items-center rounded-t-xl border-b border-gray-200 bg-white p-6">
      <Form
        onSubmit={onSubmit}
        defaultValues={defaultValues}
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

      <Button
        onClick={() => {
          router.back();
        }}
        label="Cancel"
      />
    </div>
  );
});
