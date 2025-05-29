'use client';

import React, { useCallback } from 'react';
import ToDoForm from '@/section/Todo/components/TodoForm';
import { useAddTodo } from '@/section/Todo/hooks/useAddTodo';
import { TodoValue } from '@/section/Todo/types/ITodoList';
import { useToast } from '@/components/Toast/hooks/useToast';
import { ToastType } from '@/components/Toast/types/IToast';

export default function AddTodo() {
  const addMutation = useAddTodo();
  const { showToast } = useToast();

  const onSubmit = useCallback(
    async (data: TodoValue) => {
      try {
        await addMutation.mutateAsync(data);
        showToast('Todo added successfully!', ToastType.SUCCESS);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        showToast('Failed to add todo. Please try again.' + error, ToastType.ERROR);
      }
    },
    [addMutation, showToast]
  );

  return <ToDoForm onSubmitAction={onSubmit} todoToUpdate={null} />;
}
