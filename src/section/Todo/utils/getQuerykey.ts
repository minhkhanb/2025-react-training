import { useTodosStore } from '@/store/todosStore';
import { Pagination } from '../types/common';

export const getQueryKey = () => {
  const pageIndex = useTodosStore.getState().todos.pagination.page;
  const pageSize = useTodosStore.getState().todos.pagination.limit;
  const sortType = useTodosStore.getState().todos.pagination.sortType;
  const sortColumn = useTodosStore.getState().todos.pagination.sortColumn;

  const paginationKey: Pagination = {
    pageIndex,
    pageSize,
  };

  const sortingKey = [
    {
      sortType: sortType === 1 ? 'asc' : sortType === -1 ? 'desc' : '',
      sortColumn,
    },
  ];
  return ['todos', paginationKey, sortingKey];
};
