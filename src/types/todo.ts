export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoFormValues = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
