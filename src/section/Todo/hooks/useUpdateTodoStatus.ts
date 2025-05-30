import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStatusTodo } from '../api/todoService';
import { getQueryKey } from '../utils/getQuerykey';
import { PaginatedTodosResponse } from '../types/ITodoList';

export const useUpdateTodoStatus = () => {
  const queryClient = useQueryClient();

  const key = getQueryKey();

  return useMutation({
    mutationFn: updateStatusTodo,

    onSuccess: (_, { id, status }) => {
      queryClient.setQueryData<PaginatedTodosResponse>(key, oldData => {
        if (!oldData) return oldData;

        const updatedTodos = oldData.data.map(item =>
          item.id === id ? { ...item, status } : item
        );

        return {
          ...oldData,
          data: updatedTodos,
        };
      });
    },
  });
};
