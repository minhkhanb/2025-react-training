import { AddTodoModal } from './AddTodoModal';
import { Button } from '@src/components/ui/button';
import { Plus } from 'lucide-react';

export const TodoAction = () => {
  return (
    <div className="mb-4">
      <AddTodoModal
        trigger={
          <Button
            variant="outline"
            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 hover:text-white"
          >
            <Plus strokeWidth={1} absoluteStrokeWidth />
            Add new todo
          </Button>
        }
      />
    </div>
  );
};
