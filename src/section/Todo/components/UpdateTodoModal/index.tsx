'use client';

import React, { useEffect, useState } from 'react';
import ToDoForm from '@/section/Todo/components/TodoForm';
import { TodoValue } from '@/section/Todo/types/ITodoList';
import { useGetTodoById } from '../../hooks/useGetTodoById';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';

export default function UpdateTodoModal({ id }: { id: string }) {
  const [todoToUpdate, setTodoToUpdate] = useState<TodoValue | null>(null);

  const { data, isFetching } = useGetTodoById(id);

  useEffect(() => {
    if (data) {
      setTodoToUpdate(data.data);
    }
  }, [data, setTodoToUpdate]);

  return (
    <Modal title="update todo">
      {isFetching ? <Loading className="h-72" /> : <ToDoForm todoToUpdate={todoToUpdate} />}
    </Modal>
  );
}
