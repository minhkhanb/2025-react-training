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

export const AddTodoModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { addTodo } = useTodo();

  const handleSubmit = (values: TodoFormValues) => {
    addTodo(values);
    toastManager.addToast('Success', 'Added new todo', 'success');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
        </DialogHeader>
        <TodoForm onSubmitAction={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};
