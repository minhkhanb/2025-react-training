import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllTodo } from '../api/todoService';
import { SortingState } from '@tanstack/react-table';

export const usePaginatedTodos = (page: number, totalPerPage: number, sorting: SortingState) => {
  let sortType = typeof sorting === 'object' && sorting[0]?.desc ? 'desc' : 'asc';
  let sortColumn = (typeof sorting === 'object' && sorting[0]?.id) || '';

  if (typeof sorting !== 'object' || sorting?.length === 0) {
    sortType = '';
    sortColumn = '';
  }

  return useQuery({
    queryKey: ['todos', page, sorting],
    queryFn: () => getAllTodo(page, totalPerPage, sortType, sortColumn),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
