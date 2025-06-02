export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoFormValues = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;
