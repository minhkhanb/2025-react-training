'use client';

import React, { useCallback, useState } from 'react';
import TodoList from './components/TodoList';
import ConfirmModal from '@/components/ConfirmModal';
import { TodoValue } from './types/ITodoList';
import { useDeleteTodo } from './hooks/useDeleteTodo';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';

export default function Todo() {
  const [todoToDelete, setTodoToDelete] = useState<TodoValue | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const deleteMutation = useDeleteTodo();

  const onDeleteTodo = useCallback(
    (todo: TodoValue) => {
      setTodoToDelete(todo);

      setConfirmVisible(true);
    },
    [setTodoToDelete]
  );

  const confirmDelete = useCallback(() => {
    if (todoToDelete) {
      deleteMutation.mutate({ id: todoToDelete.id });
    }

    setConfirmVisible(false);

    setTodoToDelete(null);
  }, [deleteMutation, setTodoToDelete, todoToDelete]);

  const handleCancelDelete = useCallback(() => setConfirmVisible(false), []);

  return (
    <div className="flex min-h-screen justify-center bg-gray-50 p-6">
      <div className="w-full">
        <div className="flex items-center justify-between p-6">
          <div className="w-3/4">
            <h1 className="mb-5 text-start text-2xl font-bold text-gray-800">Todo Management</h1>
            <h3 className="text-start text-sm font-bold text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo distinctio laboriosam
              inventore quibusdam eligendi iste nesciunt consequuntur sint facilis. Vel doloremque
              adipisci dignissimos, corrupti neque odit unde aperiam rem facere.
            </h3>
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

        <ConfirmModal
          visible={confirmVisible}
          todoName={todoToDelete?.message || ''}
          onConfirm={confirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </div>
  );
}
