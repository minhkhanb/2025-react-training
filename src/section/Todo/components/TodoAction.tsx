'use client';

import { AddTodoModal } from './AddTodoModal';
import { Button } from '@src/components/shadcn/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { RowSelectionState } from '@tanstack/react-table';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const TodoAction = ({
  selectedIds,
  setRowSelectionAction,
}: {
  selectedIds: string[];
  setRowSelectionAction: (rowSelection: RowSelectionState) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="mb-4 flex gap-2">
      <Button
        variant="outline"
        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        <Plus strokeWidth={1} absoluteStrokeWidth />
        Add new todo
      </Button>

      <Button
        variant="destructive"
        size="sm"
        className={`${selectedIds.length === 0 ? 'hidden' : ''}`}
        disabled={selectedIds.length === 0}
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <Trash2 strokeWidth={1.5} /> Delete ({selectedIds.length})
      </Button>

      <AddTodoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          data={selectedIds}
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setRowSelectionAction({});
          }}
        />
      )}
    </div>
  );
};
