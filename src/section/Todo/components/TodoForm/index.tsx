'use client';

import { memo, useMemo } from 'react';
import { TodoFormProps, TodoValue } from '@/section/Todo/types/ITodoList';
import MyButton from '@/components/ui/MyButton';
import Form from '@/components/Form';
import * as yup from 'yup';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { OnSubmitArgs } from '@/components/Form/types/IForm';

function TodoForm({ onSubmitAction, todoToUpdate }: TodoFormProps) {
  const router = useRouter();

  type Todo = { taskName: string };

  const onSubmit = (...args: OnSubmitArgs<Todo>): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [values, defaultValues, formState, formHandlers] = args;

    if (todoToUpdate) {
      onSubmitAction({
        ...todoToUpdate,
        taskName: values.taskName,
      });
    } else {
      const todoData: TodoValue = {
        id: Date.now().toString(),
        taskName: values.taskName,
        isFinish: false,
      };

      onSubmitAction(todoData);
    }

    router.back();
  };

  const schema = yup
    .object({
      taskName: yup.string().required(),
    })
    .required();

  const defaultValues = useMemo(
    () => ({
      taskName: todoToUpdate?.taskName ?? '',
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
          name={'taskName'}
          child={
            <Input
              placeholder="Enter your task"
              // onChange={e => {
              //   return console.log(e.target.value);
              // }}
            />
          }
        />

        <MyButton label={todoToUpdate ? 'Update' : 'Add'} />
      </Form>

      <MyButton
        onClick={() => {
          router.back();
        }}
        label="Cancel"
      />
    </div>
  );
}

export default memo(TodoForm);
