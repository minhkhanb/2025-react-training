import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllTodo } from '../api/todoService';

export const usePaginatedTodos = (page: number, totalPerPage: number) => {
  return useQuery({
    queryKey: ['todos', page],
    queryFn: () => getAllTodo(page, totalPerPage),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
