import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../api/todoService';
import { useToast } from '@/components/Toast/hooks/useToast';
import { ToastType } from '@/components/Toast/types/IToast';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: (_, { taskName }) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      showToast(`Task ${taskName} updated successfully!`, ToastType.SUCCESS);
    },
  });
};
