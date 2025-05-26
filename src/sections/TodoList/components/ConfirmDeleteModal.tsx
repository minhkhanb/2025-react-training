import ConfirmDialog from '@src/components/ConfirmDialog';
import { toastManager } from '@src/modules/toast';
import { useTodo } from '@src/context/todoContext';
import { Todo } from '@src/types/todo';

export const ConfirmDeleteModal = ({ data, trigger }: { data: Todo; trigger: React.ReactNode }) => {
  const { removeTodo } = useTodo();

  const handleDelete = () => {
    removeTodo(data.id);
    toastManager.addToast('Success', `Deleted ${data.title}`, 'success');
  };

  return (
    <ConfirmDialog
      trigger={trigger}
      title="Delete Todo"
      description="Are you sure you want to delete this todo?"
      confirmText="Delete"
      onConfirm={handleDelete}
    />
  );
};
