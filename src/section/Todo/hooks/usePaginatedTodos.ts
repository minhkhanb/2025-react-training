import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllTodo } from '../api/todoService';

export const usePaginatedTodos = (page: number) => {
  return useQuery({
    queryKey: ['todos', page],
    queryFn: () => getAllTodo(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
