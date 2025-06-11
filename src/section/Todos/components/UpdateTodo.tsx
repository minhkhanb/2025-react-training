'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DoorClosed } from 'lucide-react';
import { useTodo } from '@/src/components/providers/TodoProvider';
import TodoForm from './TodoForm';

const UpdateTodo = ({ id }: { id: string }) => {
  const { updateTodo, findTodo } = useTodo();
  const { title, subTitle, note } = findTodo(id);
  const router = useRouter();

  const [state, setState] = useState({
    title,
    subTitle,
    note,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, subTitle, note } = state;

    if (title.trim() && subTitle.trim()) {
      updateTodo(id, title, subTitle, note);
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

      <h2 className="text-xl font-semibold text-gray-900">Update User</h2>
      <p className="mt-2 text-sm text-gray-600">
        This information will be displayed publicly, so be careful what you
        share.
      </p>

      <TodoForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonName="Add Todo"
        {...state}
      />
    </div>
  );
};

export default UpdateTodo;
