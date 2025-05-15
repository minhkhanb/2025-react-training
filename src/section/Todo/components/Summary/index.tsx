'use client';

import { useMemo } from 'react';
import { TodoValue } from '../../types/ITodoList';

export const Summary = ({ todos }: { todos: TodoValue[] }) => {
  const todoCompleted = useMemo(() => {
    return todos.filter(item => item.isFinish);
  }, [todos]);

  return (
    <div className="flex justify-between bg-gray-50 p-4 text-sm text-gray-600">
      <span>Total: {todos.length} tasks</span>

      <span>Completed: {todoCompleted.length}</span>
    </div>
  );
};
