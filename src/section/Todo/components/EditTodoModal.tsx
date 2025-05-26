import { toastManager } from '@src/modules/toast';
import { TodoForm } from './TodoForm';
import { useTodo } from '@src/context/todoContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@src/components/ui/dialog';
import { Todo } from '@src/types/todo';

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

  const handleSubmit = (values: TodoFormValues) => {
    updateTodo(data.id, values);
    toastManager.addToast('Success', 'Updated todo', 'success');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <TodoForm onSubmitAction={handleSubmit} data={data} />
      </DialogContent>
    </Dialog>
  );
};
