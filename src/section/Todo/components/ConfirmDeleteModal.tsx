import ConfirmDialog from '@src/components/common/ConfirmDialog';
import { toastManager } from '@src/modules/toast';
import { useTodo } from '@src/context/todoContext';
import { Todo } from '@src/types/todo';

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

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Todo"
      description="Are you sure you want to delete this todo?"
      confirmText="Delete"
      onConfirm={() => {
        removeTodo(data.id);
        toastManager.addToast('Success', `Deleted ${data.title}`, 'success');
      }}
    />
  );
};
