'use client';

import { AddUserDrawer } from './AddUserDrawer';
import { Button } from '@src/components/shadcn/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export const UserAction = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 flex gap-2">
      <Button
        variant="outline"
        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        <Plus strokeWidth={1} absoluteStrokeWidth />
        Add new user
      </Button>

      <AddUserDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
