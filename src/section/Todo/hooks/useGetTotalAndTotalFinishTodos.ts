import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTotalTodosAndTotalFinishTodos } from '../api/todoService';

export const useGetTotalAndTotalFinishTodos = () => {
  return useQuery({
    queryKey: ['todos', 'total'],
    queryFn: () => getTotalTodosAndTotalFinishTodos(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
