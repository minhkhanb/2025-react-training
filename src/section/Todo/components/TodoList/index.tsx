'use client';

import { memo, useState } from 'react';
// import { TodoItem } from '../TodoItem';
import { EmptyState } from '../EmptyState';
import { TodoListProps } from '../../types/ITodoList';
import { Summary } from '../Summary';
// import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import TodosPagination from '../Pagination';
import TodosTable from '../TodosTable';
import { SortingState } from '@tanstack/react-table';
import { usePaginatedTodos } from '../../hooks/usePaginatedTodos';
import { Pagination } from '../../types/common';

const PAGE_SIZE = 5;

function TodoList({ onDeleteTodo }: TodoListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 1,
    pageSize: PAGE_SIZE,
  });

  const { data, isFetching } = usePaginatedTodos(
    pagination.pageIndex,
    pagination.pageSize,
    sorting
  );

  const todoListData = data?.data || [];
  const totalTodos = data?.pagination?.total || 0;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-xl">
      {isFetching ? (
        <Loading className="h-96" />
      ) : !(todoListData.length > 0) ? (
        <EmptyState />
      ) : (
        <TodosTable
          todoListData={todoListData}
          onDeleteTodo={onDeleteTodo}
          sorting={sorting}
          setSorting={setSorting}
          totalItems={totalTodos}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}

      <TodosPagination
        totalItems={totalTodos}
        itemsPerPage={pagination.pageSize || 5}
        currentPage={pagination.pageIndex}
        onPageChange={page => setPagination(prev => ({ ...prev, pageIndex: page }))}
        isLoading={isFetching}
      />

      <Summary>
        {() => (
          <>
            <span>Total: {totalTodos} tasks</span>
            <span>Completed: {data?.pagination?.totalFinish || 0}</span>
          </>
        )}
      </Summary>
    </div>
  );
}

export default memo(TodoList);
