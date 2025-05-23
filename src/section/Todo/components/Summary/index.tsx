'use client';

export const Summary = ({
  totalTodos,
  todosCompleted,
}: {
  totalTodos: number;
  todosCompleted: number;
}) => {
  return (
    <div className="flex justify-between bg-gray-50 p-4 text-sm text-gray-600">
      <span>Total: {totalTodos} tasks</span>

      <span>Completed: {todosCompleted}</span>
    </div>
  );
};
