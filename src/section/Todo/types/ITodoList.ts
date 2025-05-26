import { SortingState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

export interface TodoFormValues {
  taskName: string;
}

export interface TodoListProps {
  onDeleteTodo: (todo: TodoValue) => void;
}

export interface TodoValue {
  id: string;
  taskName: string;
  isFinish: boolean;
}

export interface TodoItemProps {
  todoItem: TodoValue;
  onDeleteTodo: (todo: TodoValue) => void;
  // askUpdateAction: (todo: TodoValue) => void;
}

export interface TodoFormProps {
  onSubmitAction: (data: TodoValue) => void;
  todoToUpdate: TodoValue | null;
}

type pagination = {
  pageIndex: number;
  pageSize: number;
};
export interface TodosTableProps {
  todoListData: TodoValue[];
  onDeleteTodo: (todo: TodoValue) => void;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  totalItems: number;
  pagination: pagination;
  setPagination: Dispatch<SetStateAction<pagination>>;
}
