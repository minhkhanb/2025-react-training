import { UseMutateFunction } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export interface TodoFormValues {
  message: string;
}

type handleChangeStatusTodoItemType = UseMutateFunction<
  unknown,
  Error,
  {
    _id: string;
  },
  unknown
>;

export interface TodoListProps {
  todoListData: TodoValue[];
  handleChangeStatusTodoItem: handleChangeStatusTodoItemType;
  askUpdate: (todo: TodoValue) => void;
  askDelete: (todo: TodoValue) => void;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  totalTodos: number;
}

export interface TodoValue {
  _id: string;
  message: string;
  isFinish: boolean;
}

export interface TodoItemProps {
  todoItem: TodoValue;
  askDelete: (todo: TodoValue) => void;
  handleChangeStatusTodoItemAction: handleChangeStatusTodoItemType;
  askUpdateAction: (todo: TodoValue) => void;
}

export interface TodoFormProps {
  onSubmitAction: (data: TodoValue) => void;
  todoSelectedValue: string;
  todoToUpdate: TodoValue | null;
  setTodoToUpdateAction: Dispatch<SetStateAction<TodoValue | null>>;
  setTodoSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}
