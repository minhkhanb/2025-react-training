import { toastManager } from '@src/modules/toast';
import { TodoForm } from './TodoForm';
import { useTodo } from '@src/context/todoContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@src/components/shadcn/ui/dialog';
import { Todo } from '@src/types/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type TodoFormValues = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

export const AddTodoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { addTodo } = useTodo();
  const queryClient = useQueryClient();

  const { mutate: addTodoMutation } = useMutation({
    mutationFn: (values: TodoFormValues) => {
      // Fake function using context API
      return new Promise<void>(resolve => {
        addTodo(values);
        resolve();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toastManager.addToast('Success', 'Added new todo', 'success');
      onClose();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
        </DialogHeader>
        <TodoForm onSubmitAction={addTodoMutation} />
      </DialogContent>
    </Dialog>
  );
};
