'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ToDoForm from '@/section/Todo/components/TodoForm';
import { TodoValue } from '@/section/Todo/types/ITodoList';
import { useUpdateTodo } from '../../hooks/useUpdateTodo';
import { useGetTodoById } from '../../hooks/useGetTodoById';
import Loading from '@/components/Loading';
import { useToast } from '@/components/Toast/hooks/useToast';
import { ToastType } from '@/components/Toast/types/IToast';

export default function UpdateTodo({ id }: { id: string }) {
  const [todoToUpdate, setTodoToUpdate] = useState<TodoValue>({
    id: '',
    taskName: '',
    isFinish: false,
  });

  const { data, isLoading } = useGetTodoById(id);

  const { showToast } = useToast();

  useEffect(() => {
    if (data) {
      setTodoToUpdate(data);
    }
  }, [data, setTodoToUpdate]);

  const updateMutation = useUpdateTodo();

  const onSubmit = useCallback(
    async (data: TodoValue) => {
      try {
        await updateMutation.mutateAsync(data);
        showToast('Todo updated successfully!', ToastType.SUCCESS);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        showToast('Failed to update todo. Please try again.' + error, ToastType.ERROR);
      }
    },
    [showToast, updateMutation]
  );

  if (isLoading) return <Loading className="h-72" />;

  return <ToDoForm onSubmitAction={onSubmit} todoToUpdate={todoToUpdate} />;
}
