import { toastManager } from '@src/modules/toast';
import { TodoForm } from './TodoForm';
import { useTodo } from '@src/context/todoContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@src/components/ui/dialog';
import { useState } from 'react';
import { Todo } from '@src/types/todo';

type TodoFormValues = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

export const EditTodoModal = ({ data, trigger }: { data: Todo; trigger: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { updateTodo } = useTodo();

  const handleSubmit = (values: TodoFormValues) => {
    updateTodo(data.id, values);
    toastManager.addToast('Success', 'Updated todo', 'success');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <TodoForm onSubmitAction={handleSubmit} data={data} />
      </DialogContent>
    </Dialog>
  );
};
