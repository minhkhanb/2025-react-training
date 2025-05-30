'use client';

import React from 'react';
import ToDoForm from '@/section/Todo/components/TodoForm';
import Modal from '@/components/Modal';

export default function AddTodoModal() {
  return (
    <Modal title="Add Todo">
      <ToDoForm todoToUpdate={null} />
    </Modal>
  );
}
