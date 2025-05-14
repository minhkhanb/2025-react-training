'use client';

import { TodoItem } from '../TodoItem';
import { EmptyState } from '../EmptyState';
import { TodoListProps, TodoValue } from '../../types/ITodoList';
import { Summary } from '../Summary';
import { useMemo, useState } from 'react';
import Pagination from '@/component/Pagination';

export const TodoList = ({
  todoListData,
  handleChangeStatusTodoItem,
  askUpdate,
  askDelete,
}: TodoListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const currentTodos = useMemo(
    () => todoListData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [currentPage, todoListData]
  );

  return (
    <div className="overflow-hidden rounded-b-xl bg-white shadow-xl">
      <div className="divide-y divide-gray-100">
        <EmptyState todos={todoListData} />

        {todoListData.length > 0 &&
          currentTodos.map((item: TodoValue) => (
            <TodoItem
              key={item.id}
              todoItem={item}
              handleChangeStatusTodoItemAction={handleChangeStatusTodoItem}
              askUpdateAction={askUpdate}
              askDelete={askDelete}
            />
          ))}
      </div>

      <Pagination
        totalItems={todoListData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />

      <Summary todos={todoListData} />
    </div>
  );
};
