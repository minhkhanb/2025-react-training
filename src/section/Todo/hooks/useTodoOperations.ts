'use client';

import { useCallback, useState } from 'react';
import { useToast } from '@/component/Toast/hooks/useToast';
import { ToastType } from '@/component/Toast/types/IToast';
import { TodoValue } from '../types/ITodoList';

export function useTodoOperations(initialTodos: TodoValue[] = []) {
  const [todoListData, setTodoListData] = useState<TodoValue[]>(initialTodos);
  const [todoToUpdate, setTodoToUpdate] = useState<TodoValue | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<TodoValue | null>(null);
  const [todoSelectedValue, setTodoSelectedValue] = useState<string>('');

  const { showToast } = useToast();

  const handleAddTodoItem = (todoItem: TodoValue) => {
    setTodoListData((pre: TodoValue[]) => [...pre, todoItem]);

    showToast(`Task ${todoItem.message} added successfully!`, ToastType.SUCCESS);
  };

  const handleDeleteTodoItem = useCallback(
    (id: string, message: string) => {
      setTodoListData((pre: TodoValue[]) => pre.filter((item: TodoValue) => item.id !== id));

      showToast(`Task ${message} deleted successfully!`, ToastType.SUCCESS);
    },
    [showToast]
  );

  const handleChangeStatusTodoItem = useCallback(
    (id: string) => {
      let message = '';

      setTodoListData((pre: TodoValue[]) =>
        pre.map((item: TodoValue) => {
          if (item.id === id) {
            message = item.message;

            return { ...item, isFinish: !item.isFinish };
          }

          return item;
        })
      );

      showToast(`Task ${message} updated status successfully!`, ToastType.SUCCESS);
    },
    [showToast]
  );

  const handleUpdateTodoItem = useCallback(
    (message: string) => {
      setTodoListData((pre: TodoValue[]) =>
        pre.map((item: TodoValue) => {
          if (item.id === todoToUpdate?.id) {
            return { ...item, message };
          }

          return item;
        })
      );

      showToast(`Task ${message} updated successfully!`, ToastType.SUCCESS);

      setTodoSelectedValue('');
    },
    [showToast, todoToUpdate?.id]
  );

  return {
    todoListData,
    todoToUpdate,
    todoToDelete,
    todoSelectedValue,
    setTodoToUpdate,
    setTodoToDelete,
    setTodoSelectedValue,
    handleAddTodoItem,
    handleDeleteTodoItem,
    handleChangeStatusTodoItem,
    handleUpdateTodoItem,
  };
}
