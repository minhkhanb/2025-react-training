'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TodoForm from './TodoForm';
import { useTodo } from '@/src/components/providers/TodoProvider';
import TodoFormDialog from './TodoFormDialog';

interface TodoData {
  title: string;
  subTitle: string;
  note?: string;
}

const AddTodo = () => {
  const { addTodo } = useTodo();
  const router = useRouter();

  const handleAddTodo = useCallback((data: TodoData) => {
    const { title, subTitle, note = '' } = data;
    addTodo(title, subTitle, note!);
    router.back();
  }, []);

  return (
    <TodoFormDialog>
      <h2 className="text-xl font-semibold text-gray-900">Update User</h2>
      <p className="mt-2 text-sm text-gray-600">
        This information will be displayed publicly, so be careful what you
        share.
      </p>
      <TodoForm handleSubmit={handleAddTodo} />
    </TodoFormDialog>
  );
};

export default AddTodo;
