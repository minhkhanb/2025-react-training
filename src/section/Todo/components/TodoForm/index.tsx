'use client';

import { useMemo } from 'react';
import { TodoFormProps, TodoFormValues, TodoValue } from '@/section/Todo/types/ITodoList';
import MyButton from '@/components/ui/MyButton';
import Form from '@/components/Form';
import * as yup from 'yup';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { OnSubmitArgs } from '@/components/Form/types/IForm';
// import Dropdown from '@/components/ui/Dropdown';
import PrioritySelect from '../PrioritySelect';
import { useUpdateTodo } from '../../hooks/useUpdateTodo';
import { useAddTodo } from '../../hooks/useAddTodo';
import { ToastType } from '@/components/Toast/types/IToast';
import { useToast } from '@/components/Toast/hooks/useToast';
import { isApiError } from '../../utils/isApiError';

function TodoForm({ todoToUpdate }: TodoFormProps) {
  const router = useRouter();

  const updateMutation = useUpdateTodo();

  const addMutation = useAddTodo();

  const { showToast } = useToast();

  const handleUpdateTodo = async (data: { todo: TodoValue }) => {
    try {
      await updateMutation.mutateAsync(data);

      showToast('Todo updated successfully', ToastType.SUCCESS);

      router.push('/todo-list');
    } catch (error) {
      if (isApiError<TodoValue>(error)) {
        showToast('Server error: ' + error.message.join(', '), ToastType.ERROR);
      } else {
        showToast('Unexpected error occurred.', ToastType.ERROR);
      }
    }
  };

  const handleAddTodo = async (todo: TodoValue) => {
    try {
      await addMutation.mutateAsync(todo);

      showToast('Todo created successfully', ToastType.SUCCESS);

      router.push('/todo-list');
    } catch (error) {
      if (isApiError<TodoValue>(error)) {
        showToast('Server error: ' + error.message.join(', '), ToastType.ERROR);
      } else {
        showToast('Unexpected error occurred.', ToastType.ERROR);
      }
    }
  };

  const onSubmit = (...args: OnSubmitArgs<TodoFormValues>): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [values, defaultValues, formState, formHandlers] = args;

    const fixedDate = new Date(values.dueDate);
    fixedDate.setHours(12);

    if (todoToUpdate) {
      const data = {
        todo: {
          ...todoToUpdate,
          title: values.title,
          description: values.description || '',
          dueDate: fixedDate,
          priority: values.priority,
        },
      };

      handleUpdateTodo(data);
    } else {
      const todoData: TodoValue = {
        id: Date.now().toString(),
        title: values.title,
        description: values.description || '',
        dueDate: fixedDate,
        priority: values.priority,
        status: 'todo',
      };

      handleAddTodo(todoData);
    }
  };

  const schema = yup.object({
    // title: yup.string().required('Title is required'),

    description: yup.string().nullable(),

    dueDate: yup
      .date()
      .min(new Date(), 'Due date must be in the future')
      .required('Due date is required'),

    priority: yup
      .string()
      .oneOf(['low', 'medium', 'high'], 'Priority must be one of: low, medium, high')
      .required('Priority is required'),
  });

  const defaultValues = useMemo<TodoFormValues>(() => {
    return todoToUpdate
      ? {
          title: todoToUpdate.title,
          description: todoToUpdate.description || '',
          dueDate: new Date(todoToUpdate.dueDate).toISOString().split('T')[0],
          priority: todoToUpdate.priority as 'low' | 'medium' | 'high',
        }
      : {
          title: '',
          description: '',
          dueDate: new Date().toISOString().split('T')[0],
          priority: '',
        };
  }, [todoToUpdate]);

  return (
    <div className="rounded-t-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
      <div className="p-6">
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          validationSchema={schema}
          className="space-y-4"
        >
          <div className="mb-4">
            <p className="mt-1 text-sm text-gray-600">
              {todoToUpdate ? 'Edit your existing task' : 'Create a new task to get started'}
            </p>
          </div>

          <div className="space-y-4">
            <Form.FormField
              name={'title'}
              child={Input}
              childProps={{
                label: 'Todo Title',
                placeholder: 'Enter your task title...',
                className: 'px-4 py-3 text-sm placeholder-gray-400',
              }}
            />
            <Form.FormField
              name={'description'}
              child={Input}
              childProps={{
                label: 'Todo Description',
                placeholder: 'Enter your task description...',
                className: 'px-4 py-3 text-sm placeholder-gray-400',
              }}
            />

            <Form.FormField
              name={'dueDate'}
              child={Input}
              childProps={{
                label: 'Todo Due Date',
                type: 'date',
                className: 'px-4 py-3 text-sm placeholder-gray-400',
              }}
            />

            <Form.FormField
              name={'priority'}
              child={
                // <Dropdown
                //   label="Todo Priority"
                //   className="w-full px-4 py-3.5 text-sm placeholder-gray-400"
                //   options={[
                //     { value: 'low', label: 'Low' },
                //     { value: 'medium', label: 'Medium' },
                //     { value: 'high', label: 'High' },
                //   ]}
                //   name={'priority'}
                // />
                PrioritySelect
              }
            />

            <div className="flex items-center justify-between pt-2">
              <div className="flex space-x-3">
                <MyButton
                  loading={
                    (updateMutation.isPending || addMutation.isPending) &&
                    (!addMutation.isSuccess || !updateMutation.isSuccess)
                  }
                  label={todoToUpdate ? 'Update Task' : 'Add Task'}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                />

                {/* <MyButton
              onClick={() => {
                router.back();
              }}
              label="Cancel"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 
                       rounded-lg font-medium transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            /> */}
              </div>

              <div className="text-xs text-gray-500">Press Enter to submit</div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default TodoForm;
