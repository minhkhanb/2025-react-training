'use client';

import { AddTodoModal } from './AddTodoModal';
import { Button } from '@src/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export const TodoAction = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <Button
        variant="outline"
        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        <Plus strokeWidth={1} absoluteStrokeWidth />
        Add new todo
      </Button>

      <AddTodoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
