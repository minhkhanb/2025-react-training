'use client';

import React, { memo } from 'react';
import { TodoValue } from '../../types/ITodoList';
import { useUpdateTodoStatus } from '../../hooks/useUpdateTodoStatus';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/Toast/hooks/useToast';
import { ToastType } from '@/components/Toast/types/IToast';
import { isApiError } from '../../utils/isApiError';

function SelectTodoStatus({ original }: { original: TodoValue }) {
  const updateStatusMutation = useUpdateTodoStatus();

  const currentStatus = original.status;

  const { showToast } = useToast();

  const handleUpdateStatusTodo = async (id: string, status: 'todo' | 'in-progress' | 'done') => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });

      showToast('Todo status updated successfully', ToastType.SUCCESS);
    } catch (error) {
      if (isApiError<TodoValue>(error)) {
        showToast('Server error: ' + error.message.join(', '), ToastType.ERROR);
      } else {
        showToast('Unexpected error occurred.', ToastType.ERROR);
      }
    }
  };

  const handleChange = (value: string) => {
    const newStatus = value;
    if (newStatus !== currentStatus) {
      handleUpdateStatusTodo(original.id, newStatus as 'todo' | 'in-progress' | 'done');
    }
  };

  return (
    <Select value={currentStatus} onValueChange={handleChange}>
      <SelectTrigger
        className={`w-full border-none outline-none ${currentStatus === 'todo' && 'bg-gray-300'} ${currentStatus === 'in-progress' && 'bg-blue-300'} ${currentStatus === 'done' && 'bg-green-300'}`}
      >
        <SelectValue className="bg-none" placeholder="Select a Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem className="bg-gray-300 text-gray-600 focus:bg-gray-500" value="todo">
            To Do
          </SelectItem>
          <SelectItem className="bg-blue-300 text-blue-600 focus:bg-blue-500" value="in-progress">
            In Progress
          </SelectItem>
          <SelectItem className="bg-green-300 text-green-600 focus:bg-green-500" value="done">
            Done
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default memo(SelectTodoStatus);
