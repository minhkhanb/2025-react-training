import { SortingState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { Pagination } from './common';

export interface TodoValue {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | '';
  status: 'todo' | 'in-progress' | 'done';
}

export type TodoFormValues = Omit<TodoValue, 'id' | 'dueDate' | 'status'> & {
  dueDate: string;
};

export type TodoToDeleteValues = Omit<TodoValue, 'status' | 'dueDate' | 'priority' | 'description'>;

export interface PaginatedTodosResponse {
  data: TodoValue[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalFinish: number;
    totalPages: number;
    sortType: number | undefined;
    sortColumn: string;
  };
}

export interface getTotalTodosAndTotalFinishTodosResponse {
  totalTodos: number;
  totalFinishTodos: number;
}

export interface TodoFormProps {
  todoToUpdate: TodoValue | null;
}

export interface TodoListProps {
  onDeleteTodo: (todo: TodoToDeleteValues) => void;
}

export interface TodoItemProps extends TodoListProps {
  todoItem: TodoValue;
}

export interface TodosTableProps extends TodoListProps {
  // todoListData: TodoValue[];
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  // totalItems: number;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
}
