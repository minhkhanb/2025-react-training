'use client';

import React, { useCallback, useState } from 'react';
import { TodoList } from './components/TodoList';
import { ToDoForm } from './components/TodoForm';
import { useTodoOperations } from './hooks/useTodoOperations';
import { ConfirmModal } from '@/component/ConfirmModal';
import { TodoValue } from './types/ITodoList';

export default function Todo() {
  const todoList: TodoValue[] = [
    { id: (Date.now() + 1).toString(), message: 'Learn ReactJS', isFinish: false },
    { id: (Date.now() + 2).toString(), message: 'Learn NextJS', isFinish: false },
    { id: (Date.now() + 3).toString(), message: 'Implement Todo List', isFinish: true },
  ];

  const {
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
  } = useTodoOperations(todoList);

  const [confirmVisible, setConfirmVisible] = useState(false);

  const onSubmit = (data: TodoValue) => {
    if (todoToUpdate) {
      handleUpdateTodoItem(data.message);
    } else {
      handleAddTodoItem(data);
    }
  };

  const askUpdate = useCallback(
    (todo: TodoValue) => {
      setTodoToUpdate(todo);
      setTodoSelectedValue(todo.message);
    },
    [setTodoSelectedValue, setTodoToUpdate]
  );

  const askDelete = useCallback(
    (todo: TodoValue) => {
      setTodoToDelete(todo);

      setConfirmVisible(true);
    },
    [setTodoToDelete]
  );

  const confirmDelete = useCallback(() => {
    if (todoToDelete) {
      handleDeleteTodoItem(todoToDelete.id, todoToDelete.message);
    }

    setConfirmVisible(false);

    setTodoToDelete(null);
  }, [handleDeleteTodoItem, setTodoToDelete, todoToDelete]);
  // Simulate fetching data from an API

  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">My Tasks</h1>

        <ToDoForm
          onSubmitAction={onSubmit}
          todoSelectedValue={todoSelectedValue}
          todoToUpdate={todoToUpdate}
          setTodoToUpdateAction={setTodoToUpdate}
          setTodoSelectedValue={setTodoSelectedValue}
        />

        <TodoList
          todoListData={todoListData}
          handleChangeStatusTodoItem={handleChangeStatusTodoItem}
          askUpdate={askUpdate}
          askDelete={askDelete}
        />

        <ConfirmModal
          visible={confirmVisible}
          title={`Delete "${todoToDelete?.message}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmVisible(false)}
          message="Are you sure you want to delete this task?"
        />
      </div>
    </div>
  );
}
