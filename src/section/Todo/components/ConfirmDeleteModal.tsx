import ConfirmDialog from '@src/components/common/ConfirmDialog';
import { toastManager } from '@src/modules/toast';
import { Todo } from '@src/types/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@src/app/api/todos/route';

export const ConfirmDeleteModal = ({
  data,
  isOpen,
  onClose,
}: {
  data: Todo | string[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate: removeTodoMutation, isPending } = useMutation({
    mutationFn: () => {
      if (Array.isArray(data)) {
        return Promise.all(data.map(id => deleteTodo(id)));
      }
      return deleteTodo(data.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toastManager.addToast('Success', 'Deleted todo', 'success');
      onClose();
    },
  });

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Todo"
      description={`Are you sure you want to delete ${Array.isArray(data) ? data.length : 1} todo?`}
      confirmText="Delete"
      loading={isPending}
      onConfirm={() => {
        removeTodoMutation();
      }}
    />
  );
};
