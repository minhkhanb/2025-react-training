'use client';

import React, { useCallback, useState } from 'react';
import { TodoList } from './components/TodoList';
// import { ToDoForm } from './components/TodoForm';
// import { useTodoOperations } from './hooks/useTodoOperations';
import { ConfirmModal } from '@/components/ConfirmModal';
import { TodoValue } from './types/ITodoList';
// import { useAddTodo } from './hooks/useAddTodo';
import { useDeleteTodo } from './hooks/useDeleteTodo';
// import { useUpdateTodo } from './hooks/useUpdateTodo';
import { usePaginatedTodos } from './hooks/usePaginatedTodos';
// import { useToggleTodoStatus } from './hooks/useToggleTodoStatus';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';

export default function Todo() {
  // const todoList: TodoValue[] = [
  //   { id: (Date.now() + 1).toString(), message: 'Learn ReactJS', isFinish: false },
  //   { id: (Date.now() + 2).toString(), message: 'Learn NextJS', isFinish: false },
  //   { id: (Date.now() + 3).toString(), message: 'Implement Todo List', isFinish: true },
  //   {
  //     id: (Date.now() + 4).toString(),
  //     message:
  //       'Implement Todo Listâdssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
  //     isFinish: false,
  //   },
  // ];

  // const {
  //   // todoListData,
  //   // todoToUpdate,
  //   todoToDelete,
  //   // todoSelectedValue,
  //   // setTodoToUpdate,
  //   setTodoToDelete,
  //   // setTodoSelectedValue,
  // } = useTodoOperations(todoList);

  const [todoToDelete, setTodoToDelete] = useState<TodoValue | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = usePaginatedTodos(currentPage, 2);

  // const addMutation = useAddTodo();

  const deleteMutation = useDeleteTodo();

  // const updateMutation = useUpdateTodo(setTodoToUpdate, setTodoSelectedValue);

  // const onSubmit = useCallback(
  //   (data: TodoValue) => {
  //     if (todoToUpdate) {
  //       updateMutation.mutate({ _id: todoToUpdate._id, message: data.message });
  //     } else {
  //       addMutation.mutate(data);
  //     }
  //   },
  //   [addMutation, todoToUpdate, updateMutation]
  // );

  // const askUpdate = useCallback(
  //   (todo: TodoValue) => {
  //     setTodoToUpdate(todo);
  //     setTodoSelectedValue(todo.message);
  //   },
  //   [setTodoSelectedValue, setTodoToUpdate]
  // );

  const askDelete = useCallback(
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
  // Simulate fetching data from an API

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
            href={'add-todo'}
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

        <TodoList
          todoListData={data?.data || []}
          // askUpdate={askUpdate}
          askDelete={askDelete}
          itemsPerPage={data?.pagination?.limit || 5}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          totalTodos={data?.pagination?.total || 0}
          todosCompleted={data?.pagination?.totalFinish || 0}
        />

        <ConfirmModal
          visible={confirmVisible}
          title={`Delete "${todoToDelete?.message}"?`}
          onConfirm={confirmDelete}
          onCancel={handleCancelDelete}
          message="Are you sure you want to delete this task?"
        />
      </div>
    </div>
  );
}
