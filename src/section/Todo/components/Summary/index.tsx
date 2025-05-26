'use client';

import { useGetTotalAndTotalFinishTodos } from '../../hooks/useGetTotalAndTotalFinishTodos';

export const Summary = () => {
  const { data, isFetching } = useGetTotalAndTotalFinishTodos();

  if (isFetching) {
    return (
      <div className="flex justify-between bg-gray-50 p-4 text-sm text-gray-600">
        <span>Loading...</span>
      </div>
    );
  }

  const todosCompleted = data?.totalFinishTodos || 0;
  const totalTodos = data?.totalTodos || 0;

  return (
    <div className="flex justify-between bg-gray-50 p-4 text-sm text-gray-600">
      <span>Total: {totalTodos} tasks</span>

      <span>Completed: {todosCompleted}</span>
    </div>
  );
};
