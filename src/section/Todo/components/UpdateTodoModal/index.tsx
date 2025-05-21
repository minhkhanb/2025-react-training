'use client';

import React, { useCallback, useEffect } from 'react';
import { ToDoForm } from '@/section/Todo/components/TodoForm';
import { useTodoOperations } from '@/section/Todo/hooks/useTodoOperations';
import { TodoValue } from '@/section/Todo/types/ITodoList';
import { useUpdateTodo } from '../../hooks/useUpdateTodo';
import { useGetTodoById } from '../../hooks/useGetTodoById';

export default function UpdateTodo({ id }: { id: string }) {
  const { todoToUpdate, todoSelectedValue, setTodoToUpdate, setTodoSelectedValue } =
    useTodoOperations([]);

  const { data, isLoading } = useGetTodoById(id);

  useEffect(() => {
    setTodoSelectedValue(data?.message);
    setTodoToUpdate(data);
  }, [todoSelectedValue, data, setTodoSelectedValue, setTodoToUpdate]);

  console.log(data, isLoading);

  const updateMutation = useUpdateTodo(setTodoToUpdate, setTodoSelectedValue);

  const onSubmit = useCallback(
    (data: TodoValue) => {
      updateMutation.mutate(data);
    },
    [updateMutation]
  );

  return (
    <ToDoForm
      onSubmitAction={onSubmit}
      todoSelectedValue={todoSelectedValue}
      todoToUpdate={todoToUpdate}
      setTodoToUpdateAction={setTodoToUpdate}
      setTodoSelectedValue={setTodoSelectedValue}
    />
  );
}
