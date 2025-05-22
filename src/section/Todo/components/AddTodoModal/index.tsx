'use client';

import React, { useCallback } from 'react';
import { ToDoForm } from '@/section/Todo/components/TodoForm';
import { useAddTodo } from '@/section/Todo/hooks/useAddTodo';
import { TodoValue } from '@/section/Todo/types/ITodoList';

export default function AddTodo() {
  const addMutation = useAddTodo();

  const onSubmit = useCallback(
    (data: TodoValue) => {
      addMutation.mutate(data);
    },
    [addMutation]
  );

  return <ToDoForm onSubmitAction={onSubmit} todoToUpdate={null} />;
}
