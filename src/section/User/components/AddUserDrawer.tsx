import { toastManager } from '@src/modules/toast';
import { UserForm } from './UserForm';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@src/components/shadcn/ui/sheet';
import { RegisterRequest } from '@src/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '@src/app/api/users/route';

export const AddUserDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const queryClient = useQueryClient();

  const { mutate: addUserMutation, isPending } = useMutation({
    mutationFn: (values: RegisterRequest) => createUser(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toastManager.addToast('Success', 'Added new user', 'success');
      onClose();
    },
    onError: error => {
      toastManager.addToast('Register failed', error.message, 'error');
    },
  });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Add New User</SheetTitle>
          <SheetDescription>
            This information will be displayed publicly so be careful what you share.
          </SheetDescription>
        </SheetHeader>
        <UserForm onSubmitAction={addUserMutation} loading={isPending} />
      </SheetContent>
    </Sheet>
  );
};
