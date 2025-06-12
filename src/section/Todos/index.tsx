'use client';

import { useRouter } from 'next/navigation';
import TodoTable from '@/src/section/Todos/components/TodoTable';
import { Button } from '@/src/components/shadcn/ui/button';

const TodoList = () => {
  const router = useRouter();
  const onOpen = () => router.push('/todos/add');

  return (
    <main className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <Button onClick={onOpen} className="flex ml-auto mb-3 cursor-pointer">
        Add Todo
      </Button>
      <TodoTable />
    </main>
  );
};

export default TodoList;
