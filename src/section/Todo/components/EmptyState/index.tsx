'use client';

import { ContainerOutlined } from '@ant-design/icons';
import { TodoValue } from '../../types/ITodoList';

export const EmptyState = ({ todos }: { todos: TodoValue[] }) => {
  if (todos.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <ContainerOutlined className="mb-4 text-7xl text-gray-300" />

      <p>No tasks yet. Add one above!</p>
    </div>
  );
};
