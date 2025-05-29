import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../api/todoService';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
