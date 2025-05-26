'use client';

import React, { memo } from 'react';
import { TodoToDeleteValues } from '../../types/ITodoList';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

function TodoActions({
  todoToDelete,
  onDeleteTodo,
}: {
  todoToDelete: TodoToDeleteValues;
  onDeleteTodo: (todo: TodoToDeleteValues) => void;
}) {
  const router = useRouter();

  return (
    <div className="my-3">
      <button
        onClick={() => {
          router.push(`/todo-list/update/${todoToDelete.id}`);
          // askUpdateAction(todoItem);
        }}
        className="h-10 w-10 cursor-pointer rounded-full text-gray-400 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        <EditOutlined className="flex h-5 w-5 justify-center rounded-b-full text-xs" />
      </button>

      <button
        onClick={() => onDeleteTodo?.(todoToDelete)}
        className="ml-2 h-10 w-10 cursor-pointer rounded-full text-gray-400 transition-colors duration-200 hover:bg-red-100 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
      >
        <CloseOutlined className="flex h-5 w-5 justify-center rounded-b-full text-xs" />
      </button>
    </div>
  );
}

export default memo(TodoActions);
