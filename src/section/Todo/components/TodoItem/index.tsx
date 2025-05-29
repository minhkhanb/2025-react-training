'use client';

import { memo } from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { cn } from '@/utils/cn';
import { TodoItemProps } from '../../types/ITodoList';
import { useUpdateTodoStatus } from '../../hooks/useUpdateTodoStatus';
import { useRouter } from 'next/navigation';

function TodoItem({
  todoItem,
  // askUpdateAction,
  onDeleteTodo,
}: TodoItemProps) {
  // useEffect(() => console.log('render'));
  const updateStatusMutation = useUpdateTodoStatus();
  const router = useRouter();

  return (
    <div className="group flex items-center justify-between p-4 transition-all duration-200 hover:bg-gray-50">
      <div className="flex flex-1 items-center overflow-hidden">
        <div className="relative">
          <input
            type="checkbox"
            checked={todoItem.status === 'done'}
            onChange={() => updateStatusMutation.mutate({ id: todoItem.id, status: 'done' })}
            className="h-5 w-5 cursor-pointer rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>

        <h2
          className={cn(
            'ml-3 truncate whitespace-nowrap text-gray-800',
            todoItem.status === 'done' && 'text-gray-400 line-through'
          )}
        >
          {todoItem.title}
        </h2>
      </div>

      <button
        onClick={() => {
          router.push(`/update-todo/${todoItem.id}`);
          // askUpdateAction(todoItem);
        }}
        className="ml-2 h-10 w-10 cursor-pointer rounded-full p-1 text-gray-400 opacity-0 transition-colors duration-200 group-hover:opacity-100 hover:bg-blue-100 hover:text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        <EditOutlined className="flex h-5 w-5 justify-center rounded-b-full text-xs" />
      </button>

      <button
        onClick={() => onDeleteTodo(todoItem)}
        className="ml-2 h-10 w-10 cursor-pointer rounded-full p-1 text-gray-400 opacity-0 transition-colors duration-200 group-hover:opacity-100 hover:bg-red-100 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
      >
        <CloseOutlined className="flex h-5 w-5 justify-center rounded-b-full text-xs" />
      </button>
    </div>
  );
}

export default memo(TodoItem);
