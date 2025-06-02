'use client';

import React, { useCallback, useState } from 'react';
import TodoList from './components/TodoList';
import ConfirmModal from '@/components/ConfirmModal';
import { TodoToDeleteValues, TodoValue } from './types/ITodoList';
import { useDeleteTodo } from './hooks/useDeleteTodo';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import { ToastType } from '@/components/Toast/types/IToast';
import { useToast } from '@/components/Toast/hooks/useToast';
import { isApiError } from './utils/isApiError';

export default function Todo() {
  const [todoToDelete, setTodoToDelete] = useState<TodoToDeleteValues | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const { showToast } = useToast();

  const deleteMutation = useDeleteTodo();

  const onDeleteTodo = useCallback(
    (todo: TodoToDeleteValues) => {
      setTodoToDelete(todo);

      setConfirmVisible(true);
    },
    [setTodoToDelete]
  );

  const confirmDelete = useCallback(async () => {
    if (todoToDelete) {
      try {
        await deleteMutation.mutateAsync({ id: todoToDelete.id });

        showToast('Todo status updated successfully', ToastType.SUCCESS);
      } catch (error) {
        if (isApiError<TodoValue>(error)) {
          showToast('Server error: ' + error.message.join(', '), ToastType.ERROR);
        } else {
          showToast('Unexpected error occurred.', ToastType.ERROR);
        }
      }

      setConfirmVisible(false);

      setTodoToDelete(null);
    }
  }, [deleteMutation, showToast, todoToDelete]);

  const handleCancelDelete = useCallback(() => setConfirmVisible(false), []);

  return (
    <div className="flex min-h-screen justify-center bg-gray-50 p-6">
      <div className="w-full">
        <div className="flex flex-col items-end justify-between py-6 md:flex-row md:items-center">
          <div className="w-full md:w-3/4">
            <h1 className="mb-5 text-start text-2xl font-bold text-gray-800">Todo Management</h1>
            <h2 className="text-start text-sm font-bold text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo distinctio laboriosam
              inventore quibusdam eligendi iste nesciunt consequuntur sint facilis. Vel doloremque
              adipisci dignissimos, corrupti neque odit unde aperiam rem facere.
            </h2>
          </div>

          <Link
            className="mx-1 my-3 inline-flex h-10 w-48 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-105 active:opacity-100"
            href={'todo-list/add'}
          >
            <PlusOutlined className="mr-2" /> Add new todo
          </Link>
        </div>

        {/* <ToDoForm
          onSubmitAction={onSubmit}
          todoSelectedValue={todoSelectedValue}
          todoToUpdate={todoToUpdate}
          setTodoToUpdateAction={setTodoToUpdate}
          setTodoSelectedValue={setTodoSelectedValue}
        /> */}

        <TodoList onDeleteTodo={onDeleteTodo} />

        {todoToDelete && (
          <ConfirmModal
            visible={confirmVisible}
            todoTitle={todoToDelete.title}
            onConfirm={confirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
}
