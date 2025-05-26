import { SortingState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { Pagination } from './common';

export interface TodoValue {
  id: string;
  taskName: string;
  isFinish: boolean;
}

export type TodoFormValues = Omit<TodoValue, 'id' | 'isFinish'>;

export type TodoToDeleteValues = Omit<TodoValue, 'isFinish'>;

export interface PaginatedTodosResponse {
  data: TodoValue[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface getTotalTodosAndTotalFinishTodosResponse {
  totalTodos: number;
  totalFinishTodos: number;
}

export interface TodoFormProps {
  onSubmitAction: (data: TodoValue) => void;
  todoToUpdate: TodoValue | null;
}

export interface TodoListProps {
  onDeleteTodo: (todo: TodoToDeleteValues) => void;
}

export interface TodoItemProps extends TodoListProps {
  todoItem: TodoValue;
}

export interface TodosTableProps extends TodoListProps {
  todoListData: TodoValue[];
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  totalItems: number;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
}
