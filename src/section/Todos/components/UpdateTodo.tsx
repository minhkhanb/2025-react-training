'use client';

import { useRouter } from 'next/navigation';
import { DoorClosed } from 'lucide-react';
import { useTodo } from '@/src/components/providers/TodoProvider';
import TodoForm from './TodoForm';
import { TodoData } from '../schema';

const UpdateTodo = ({ id }: { id: string }) => {
  const { updateTodo, findTodo } = useTodo();
  const router = useRouter();

  const defaultValues = findTodo(id);

  const handleUpdateTodo = (data: TodoData) => {
    const { title, subTitle, note = '' } = data;
    updateTodo(id, title, subTitle, note!);
  };

  return (
    <div className="flex flex-col fixed right-0 top-0 bg-white z-10 h-full w-96 p-6 shadow-lg border-l border-gray-200">
      <DoorClosed
        onClick={() => router.back()}
        className="ml-auto cursor-pointer text-gray-500 hover:text-gray-700"
      />

      <h2 className="text-xl font-semibold text-gray-900">Update User</h2>
      <p className="mt-2 text-sm text-gray-600">
        This information will be displayed publicly, so be careful what you
        share.
      </p>

      <TodoForm
        handleSubmit={handleUpdateTodo}
        defaultValuesProps={defaultValues}
        buttonName="Update Todo"
      />
    </div>
  );
};

export default UpdateTodo;
