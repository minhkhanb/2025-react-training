import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../api/todoService';
import { useToast } from '@/components/Toast/hooks/useToast';
import { ToastType } from '@/components/Toast/types/IToast';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: (_, { todo }) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      showToast(`Task ${todo.title} updated successfully!`, ToastType.SUCCESS);
    },
  });
};
