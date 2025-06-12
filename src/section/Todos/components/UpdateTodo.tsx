'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTodo } from '@/src/components/providers/TodoProvider';
import TodoForm from './TodoForm';
import TodoFormDialog from './TodoFormDialog';

interface TodoData {
  title: string;
  subTitle: string;
  note?: string;
}

const UpdateTodo = ({ id }: { id: string }) => {
  const { updateTodo, findTodo } = useTodo();
  const router = useRouter();

  const defaultValues = useMemo(() => findTodo(id), [id]);

  const handleUpdateTodo = useCallback(
    (data: TodoData) => {
      const { title, subTitle, note = '' } = data;
      updateTodo(id, title, subTitle, note!);
      router.back();
    },
    [id]
  );

  return (
    <TodoFormDialog>
      <h2 className="text-xl font-semibold text-gray-900">Update User</h2>
      <p className="mt-2 text-sm text-gray-600">
        This information will be displayed publicly, so be careful what you
        share.
      </p>
      <TodoForm
        handleSubmit={handleUpdateTodo}
        defaultValuesProps={defaultValues}
      />
    </TodoFormDialog>
  );
};

export default UpdateTodo;
