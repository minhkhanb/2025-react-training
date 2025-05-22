import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTodoById } from '../api/todoService';

export const useGetTodoById = (id: string) => {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: () => getTodoById(id),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
