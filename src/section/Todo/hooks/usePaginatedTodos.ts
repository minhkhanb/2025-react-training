import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllTodo } from '../api/todoService';
import { SortingState } from '@tanstack/react-table';
import { Pagination } from '../types/common';

export const usePaginatedTodos = (page: number, totalPerPage: number, sorting: SortingState) => {
  let sortType = typeof sorting === 'object' && sorting[0]?.desc ? 'desc' : 'asc';
  let sortColumn = (typeof sorting === 'object' && sorting[0]?.id) || '';

  if (typeof sorting !== 'object' || sorting?.length === 0) {
    sortType = '';
    sortColumn = '';
  }

  const paginationKey: Pagination = {
    pageIndex: page,
    pageSize: totalPerPage,
  };

  const sortingKey = [
    {
      sortType,
      sortColumn,
    },
  ];

  return useQuery({
    queryKey: ['todos', paginationKey, sortingKey],
    queryFn: () => getAllTodo(page, totalPerPage, sortType, sortColumn),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
