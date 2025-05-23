import UpdateTodo from '@/section/Todo/components/UpdateTodoModal';
import React from 'react';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UpdateTodo id={id} />;
}
