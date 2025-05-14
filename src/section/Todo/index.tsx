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
    { id: (Date.now() + 4).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 5).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 6).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 7).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 8).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 9).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 10).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 11).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 12).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 13).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 14).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 15).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 16).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 17).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 18).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 19).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 20).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 21).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 22).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 23).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 24).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 25).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 26).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 27).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 28).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 29).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 30).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 31).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 32).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 33).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 34).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 35).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 36).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 37).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 38).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 39).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 40).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 41).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 42).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 43).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 44).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 45).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 46).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 47).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 48).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 49).toString(), message: 'Implement Todo List', isFinish: false },
    { id: (Date.now() + 50).toString(), message: 'Implement Todo List', isFinish: false },
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
