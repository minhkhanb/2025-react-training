'use client';

import Button from '@/component/ui/Button';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { TodoValue } from '../../types/ITodoList';

export default function AddTodoFormFields({
  todoSelectedValue,
  todoToUpdate,
  setTodoToUpdateAction,
  setTodoSelectedValue,
}: {
  todoSelectedValue: string;
  todoToUpdate: TodoValue | null;
  setTodoToUpdateAction: Dispatch<SetStateAction<TodoValue | null>>;
  setTodoSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const form = useFormContext();

  useEffect(() => {
    form.setValue('message', todoSelectedValue);
  }, [todoSelectedValue, form]);

  return (
    <>
      {todoToUpdate && (
        <Button
          onClick={() => {
            setTodoToUpdateAction(null);
            form.reset();
            setTodoSelectedValue('');
          }}
          label="Cancel"
        />
      )}
    </>
  );
}
