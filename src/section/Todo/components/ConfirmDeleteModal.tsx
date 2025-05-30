import ConfirmDialog from '@src/components/common/ConfirmDialog';
import { toastManager } from '@src/modules/toast';
import { useTodo } from '@src/context/todoContext';
import { Todo } from '@src/types/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const ConfirmDeleteModal = ({
  data,
  isOpen,
  onClose,
}: {
  data: Todo;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { removeTodo } = useTodo();

  const queryClient = useQueryClient();

  const { mutate: removeTodoMutation } = useMutation({
    mutationFn: () => {
      // Fake function using context API
      return new Promise<void>(resolve => {
        removeTodo(data.id);
        resolve();
      });
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
      description="Are you sure you want to delete this todo?"
      confirmText="Delete"
      onConfirm={() => {
        removeTodoMutation();
      }}
    />
  );
};
