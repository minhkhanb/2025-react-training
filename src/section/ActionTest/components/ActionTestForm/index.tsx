'use client';

import React from 'react';
import Input from '@/components/ui/Input';
import PrioritySelect from '@/section/Todo/components/PrioritySelect';
import { Button } from '@/components/ui/button';

type ActionTestFormProps = {
  handleFormAction: (formData: FormData) => Promise<void>;
  messages: string[] | string;
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
};

export default function ActionTestForm({
  handleFormAction,
  messages,
  priority,
  setPriority,
}: ActionTestFormProps) {
  const defaultValues = {
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
  };

  return (
    <form action={handleFormAction} className="w-11/12">
      <Input
        label="Todo Title"
        title="Todo Title"
        placeholder="Enter your task title..."
        className="px-4 py-3 text-sm placeholder-gray-400"
        name="title"
        defaultValue={defaultValues.title}
      />

      <Input
        label="Todo Description"
        title="Todo Description"
        placeholder="Enter your task description..."
        className="px-4 py-3 text-sm placeholder-gray-400"
        name="description"
        defaultValue={defaultValues.description}
      />

      <Input
        label="Todo Due Date"
        title="Todo Due Date"
        type="date"
        className="px-4 py-3 text-sm placeholder-gray-400"
        name="dueDate"
        defaultValue={defaultValues.dueDate}
      />

      <PrioritySelect error={''} onChange={setPriority} value={priority} />

      {messages && Array.isArray(messages) && (
        <ul className="space-y-1 text-sm font-semibold text-red-500">
          {messages.map((msg, index) => (
            <li key={index}>• {msg}</li>
          ))}
        </ul>
      )}

      {messages && typeof messages === 'string' && (
        <ul className="space-y-1 text-sm font-semibold text-green-500">
          <li>• {messages}</li>
        </ul>
      )}

      <Button title="submit" className="my-4">
        Submit
      </Button>
    </form>
  );
}
