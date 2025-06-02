import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../api/todoService';
import { PaginatedTodosResponse } from '../types/ITodoList';
import { getQueryKey } from '../utils/getQuerykey';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const key = getQueryKey();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: (_, { todo }) => {
      queryClient.setQueryData<PaginatedTodosResponse>(key, oldData => {
        if (!oldData) return oldData;

        const updatedTodos = oldData.data.map(item =>
          item.id === todo.id ? { ...item, ...todo } : item
        );

        return {
          ...oldData,
          data: updatedTodos,
        };
      });
    },
  });
};
