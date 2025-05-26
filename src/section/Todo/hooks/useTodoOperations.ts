'use client';

import { useCallback, useState } from 'react';
import { useToast } from '@/components/Toast/hooks/useToast';
import { ToastType } from '@/components/Toast/types/IToast';
import { TodoValue } from '../types/ITodoList';

export function useTodoOperations(initialTodos: TodoValue[] = []) {
  const [todoListData, setTodoListData] = useState<TodoValue[]>(initialTodos);
  const [todoToUpdate, setTodoToUpdate] = useState<TodoValue | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<TodoValue | null>(null);
  const [todoSelectedValue, setTodoSelectedValue] = useState<string>('');

  const { showToast } = useToast();

  const handleAddTodoItem = useCallback(
    (todoItem: TodoValue) => {
      setTodoListData((pre: TodoValue[]) => [...pre, todoItem]);

      showToast(`Task ${todoItem.taskName} added successfully!`, ToastType.SUCCESS);
    },
    [showToast]
  );

  const handleDeleteTodoItem = useCallback(
    (id: string, taskName: string) => {
      setTodoListData((pre: TodoValue[]) => pre.filter((item: TodoValue) => item.id !== id));

      showToast(`Task ${taskName} deleted successfully!`, ToastType.SUCCESS);
    },
    [showToast]
  );

  const handleChangeStatusTodoItem = useCallback(
    (id: string) => {
      let taskName = '';

      setTodoListData((pre: TodoValue[]) =>
        pre.map((item: TodoValue) => {
          if (item.id === id) {
            taskName = item.taskName;

            return { ...item, isFinish: !item.isFinish };
          }

          return item;
        })
      );

      showToast(`Task ${taskName} updated status successfully!`, ToastType.SUCCESS);
    },
    [showToast]
  );

  const handleUpdateTodoItem = useCallback(
    (taskName: string) => {
      setTodoListData((pre: TodoValue[]) =>
        pre.map((item: TodoValue) => {
          if (item.id === todoToUpdate?.id) {
            return { ...item, taskName };
          }

          return item;
        })
      );

      showToast(`Task ${taskName} updated successfully!`, ToastType.SUCCESS);

      setTodoSelectedValue('');

      setTodoToUpdate(null);
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
