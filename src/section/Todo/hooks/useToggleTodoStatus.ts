import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStatusTodo } from '../api/todoService';

export const useToggleTodoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStatusTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
