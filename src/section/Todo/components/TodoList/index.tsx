'use client';

import { memo } from 'react';
import { TodoItem } from '../TodoItem';
import { EmptyState } from '../EmptyState';
import { TodoListProps, TodoValue } from '../../types/ITodoList';
import { Summary } from '../Summary';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';

export const TodoList = memo(function TodoList({
  todoListData,
  // askUpdate,
  askDelete,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  isLoading,
  totalTodos,
}: TodoListProps) {
  // const currentTodos = useMemo(
  //   () => todoListData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
  //   [currentPage, itemsPerPage, todoListData]
  // );

  return (
    <div className="overflow-hidden rounded-b-xl bg-white shadow-xl">
      <div className="divide-y divide-gray-100">
        {isLoading ? <Loading className="h-96" /> : <EmptyState todos={todoListData} />}
        {todoListData.length > 0 &&
          todoListData.map((item: TodoValue) => (
            <TodoItem
              key={item.id}
              todoItem={item}
              // askUpdateAction={askUpdate}
              askDelete={askDelete}
            />
          ))}
      </div>

      <Pagination
        totalItems={totalTodos}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />

      <Summary todos={todoListData} />
    </div>
  );
});
