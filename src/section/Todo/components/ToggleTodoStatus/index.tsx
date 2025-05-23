'use client';

import React, { memo } from 'react';
import Checkbox from '@/components/ui/Checkbox';
import { useToggleTodoStatus } from '../../hooks/useToggleTodoStatus';
import { CellContext } from '@tanstack/react-table';
import { TodoValue } from '../../types/ITodoList';

export const ToggleTodoStatus = memo(function ToggleTodoStatus(
  info: CellContext<TodoValue, unknown>
) {
  const updateStatusMutation = useToggleTodoStatus();

  return (
    <Checkbox
      label={''}
      defaultChecked={info.getValue() as boolean}
      onChange={() => updateStatusMutation.mutate({ id: info.row.original.id })}
    />
  );
});
