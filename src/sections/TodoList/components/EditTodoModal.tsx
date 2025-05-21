import { toastManager } from '@src/modules/toast';
import { Button } from '@src/components/ui/button';
import { Pencil } from 'lucide-react';
import TodoForm from '@src/components/TodoForm';
import { useTodo } from '@src/contexts/todoContext';
import { Todo } from '@src/types/todos';

export default function EditTodoModal({ row }: { row: Todo }) {
  const { updateTodo } = useTodo();

  return (
    <TodoForm
      trigger={
        <Button className="cursor-pointer" variant="outline" size="sm">
          <Pencil strokeWidth={1.5} />
        </Button>
      }
      data={row}
      onSubmitAction={values => {
        updateTodo(row.id, values);
        toastManager.addToast('Success', `Edited ${row.title}`, 'success');
      }}
    />
  );
}
