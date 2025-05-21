import { ToastType } from '@/components/Toast/types/IToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../api/todoService';
import { useToast } from '@/components/Toast/hooks/useToast';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (_, { _id }) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      showToast(`Task ${_id} deleted successfully!`, ToastType.SUCCESS);
    },
  });
};
