import ConfirmDialog from '@src/components/common/ConfirmDialog';
import { toastManager } from '@src/modules/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@src/app/api/users/route';

export const ConfirmDeleteUser = ({
  id,
  isOpen,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate: removeUserMutation, isPending } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toastManager.addToast('Success', 'Deleted user', 'success');
      onClose();
    },
    onError: error => {
      toastManager.addToast('Delete failed', error.message, 'error');
    },
  });

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete User"
      description="Are you sure you want to delete this user?"
      confirmText="Delete"
      loading={isPending}
      onConfirm={() => {
        removeUserMutation();
      }}
    />
  );
};
