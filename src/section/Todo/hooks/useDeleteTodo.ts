import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../api/todoService';
import { getQueryKey } from '../utils/getQuerykey';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const key = getQueryKey();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};
