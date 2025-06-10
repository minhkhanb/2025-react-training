'use client';

import TodoTable from '@/src/section/Todos/components/TodoTable';
import { Button } from '@/src/components/shadcn/ui/button';
import { useRouter } from 'next/navigation';

const TodoList = () => {
  const router = useRouter();

  return (
    <main className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <Button
        onClick={() => router.push('/todos/add')}
        className="flex ml-auto mb-3 cursor-pointer"
      >
        Add Todo
      </Button>
      <TodoTable />
    </main>
  );
};

export default TodoList;
