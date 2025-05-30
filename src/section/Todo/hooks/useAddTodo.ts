import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../api/todoService';

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
