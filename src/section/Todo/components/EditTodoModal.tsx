import { toastManager } from '@src/modules/toast';
import { TodoForm } from './TodoForm';
import { useTodo } from '@src/context/todoContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@src/components/shadcn/ui/dialog';
import { Todo } from '@src/types/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  const { updateTodo } = useTodo();

  const queryClient = useQueryClient();

  const { mutate: updateTodoMutation } = useMutation({
    mutationFn: (values: TodoFormValues) => {
      // Fake function using context API
      return new Promise<void>(resolve => {
        updateTodo(data.id, values);
        resolve();
      });
    },
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
