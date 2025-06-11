'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DoorClosed } from 'lucide-react';
import TodoForm from './TodoForm';
import { useTodo } from '@/src/components/providers/TodoProvider';
import { TodoData } from '../schema';

const AddTodo = () => {
  const { addTodo } = useTodo();
  const router = useRouter();

  const [state, setState] = useState({
    title: '',
    subTitle: '',
    note: '',
  });

  const handleSubmit = (data: TodoData) => {
    const { title, subTitle, note = '' } = data;

    if (title.trim() && subTitle.trim()) {
      addTodo(title, subTitle, note!);
      setState({
        title: '',
        subTitle: '',
        note: '',
      });
      router.back();
    }
  };

  return (
    <div className="flex flex-col fixed right-0 top-0 bg-white z-10 h-full w-96 p-6 shadow-lg border-l border-gray-200">
      <DoorClosed
        onClick={() => router.back()}
        className="ml-auto cursor-pointer text-gray-500 hover:text-gray-700"
      />

      <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
      <p className="mt-2 text-sm text-gray-600">
        This information will be displayed publicly, so be careful what you
        share.
      </p>

      <TodoForm handleSubmit={handleSubmit} buttonName="Add Todo" {...state} />
    </div>
  );
};

export default AddTodo;
