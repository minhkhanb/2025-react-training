'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ToDoForm from '@/section/Todo/components/TodoForm';
import { TodoValue } from '@/section/Todo/types/ITodoList';
import { useUpdateTodo } from '../../hooks/useUpdateTodo';
import { useGetTodoById } from '../../hooks/useGetTodoById';
import Loading from '@/components/Loading';

export default function UpdateTodo({ id }: { id: string }) {
  const [todoToUpdate, setTodoToUpdate] = useState<TodoValue>({
    id: '',
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'low',
    status: 'todo',
  });

  const { data, isFetching } = useGetTodoById(id);

  useEffect(() => {
    setTodoToUpdate(data);
  }, [data, setTodoToUpdate]);

  const updateMutation = useUpdateTodo();

  const onSubmit = useCallback(
    (data: TodoValue) => {
      updateMutation.mutate({ todo: data });
    },
    [updateMutation]
  );

  if (isFetching) return <Loading className="h-72" />;

  return <ToDoForm onSubmitAction={onSubmit} todoToUpdate={todoToUpdate} />;
}
