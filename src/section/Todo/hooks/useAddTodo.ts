import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/Toast/hooks/useToast';
import { ToastType } from '@/components/Toast/types/IToast';
import { createTodo } from '../api/todoService';

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      showToast(`Task ${res.data.message} added successfully!`, ToastType.SUCCESS);
    },
  });
};
