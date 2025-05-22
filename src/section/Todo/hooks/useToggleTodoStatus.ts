import { useToast } from '@/components/Toast/hooks/useToast';
import { ToastType } from '@/components/Toast/types/IToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStatusTodo } from '../api/todoService';

export const useToggleTodoStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateStatusTodo,

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      showToast(`Task ${id} updated status successfully!`, ToastType.SUCCESS);
    },
  });
};
