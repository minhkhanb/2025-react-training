import { toastManager } from '@src/modules/toast';
import { Button } from '@src/components/ui/button';
import { Plus } from 'lucide-react';
import TodoForm from '@src/components/TodoForm';
import { useTodo } from '@src/contexts/todoContext';

export default function AddTodoModal() {
  const { addTodo } = useTodo();

  return (
    <TodoForm
      trigger={
        <Button
          variant="outline"
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 hover:text-white"
        >
          <Plus strokeWidth={1} absoluteStrokeWidth />
          Add new todo
        </Button>
      }
      data={undefined}
      onSubmitAction={values => {
        addTodo(values);
        toastManager.addToast('Success', `Added ${values.title}`, 'success');
      }}
    />
  );
}
