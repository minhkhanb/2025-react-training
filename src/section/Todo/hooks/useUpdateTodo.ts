/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../api/todoService';
import { useToast } from '@/components/Toast/hooks/useToast';
import { ToastType } from '@/components/Toast/types/IToast';
import { Dispatch, SetStateAction } from 'react';
import { TodoValue } from '../types/ITodoList';

export const useUpdateTodo = (
  setTodoToUpdate: Dispatch<SetStateAction<TodoValue | null>>,
  setTodoSelectedValue: Dispatch<SetStateAction<string>>
) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: (_, { _id, message }) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      showToast(`Task ${message} updated successfully!`, ToastType.SUCCESS);

      setTodoToUpdate(null);

      setTodoSelectedValue('');
    },
  });
};
