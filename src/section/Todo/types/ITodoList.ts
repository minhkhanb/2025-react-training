import { Dispatch, SetStateAction } from 'react';

export interface TodoFormValues {
  message: string;
}

export interface TodoListProps {
  todoListData: TodoValue[];
  // askUpdate: (todo: TodoValue) => void;
  askDelete: (todo: TodoValue) => void;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  totalTodos: number;
}

export interface TodoValue {
  id: string;
  message: string;
  isFinish: boolean;
}

export interface TodoItemProps {
  todoItem: TodoValue;
  askDelete: (todo: TodoValue) => void;
  // askUpdateAction: (todo: TodoValue) => void;
}

export interface TodoFormProps {
  onSubmitAction: (data: TodoValue) => void;
  // todoSelectedValue: string;
  todoToUpdate: TodoValue | null;
  // setTodoToUpdateAction: Dispatch<SetStateAction<TodoValue | null>>;
  // setTodoSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}
