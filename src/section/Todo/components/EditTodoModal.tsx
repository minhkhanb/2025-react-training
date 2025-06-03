import { toastManager } from '@src/modules/toast';
import { TodoForm } from './TodoForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@src/components/shadcn/ui/dialog';
import { Todo } from '@src/types/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@src/app/api/todos/route';

type TodoFormValues = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

export const EditTodoModal = ({
  data,
  open,
  onClose,
}: {
  data: Todo;
  open: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate: updateTodoMutation } = useMutation({
    mutationFn: (values: TodoFormValues) => updateTodo(data.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toastManager.addToast('Success', 'Updated todo', 'success');
      onClose();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <TodoForm onSubmitAction={updateTodoMutation} data={data} />
      </DialogContent>
    </Dialog>
  );
};
