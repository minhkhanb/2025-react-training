import { toastManager } from '@src/modules/toast';
import { UserForm } from './UserForm';
import { RegisterRequest } from '@src/types/auth';
import { User } from '@src/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@src/app/api/users/route';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@src/components/shadcn/ui/sheet';

export const EditUserDrawer = ({
  data,
  open,
  onClose,
}: {
  data: User;
  open: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationFn: (values: RegisterRequest) => updateUser(data.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toastManager.addToast('Success', 'Updated user', 'success');
      onClose();
    },
    onError: error => {
      toastManager.addToast('Update failed', error.message, 'error');
    },
  });

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>
            This information will be displayed publicly so be careful what you share.
          </SheetDescription>
        </SheetHeader>
        <UserForm onSubmitAction={updateUserMutation} data={data} loading={isPending} />
      </SheetContent>
    </Sheet>
  );
};
