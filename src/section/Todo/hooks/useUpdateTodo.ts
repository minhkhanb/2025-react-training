import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../api/todoService';
import { useToast } from '@/components/Toast/hooks/useToast';
import { ToastType } from '@/components/Toast/types/IToast';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: (_, { message }) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      showToast(`Task ${message} updated successfully!`, ToastType.SUCCESS);
    },
  });
};
