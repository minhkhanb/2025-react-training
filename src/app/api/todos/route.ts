import { get, post, put, del } from '@src/config/axios';
import { Todo, TodoFormValues } from '@src/types/todo';

export const getTodos = (params: { page: number; limit: number }) =>
  get<Todo[]>('/todos', { queryParam: params });

export const getTodoById = (id: number) => get<Todo>('/todos/:id', { pathParams: { id } });

export const createTodo = (data: TodoFormValues) => post<Todo, TodoFormValues>('/todos', data);

export const updateTodo = (id: number, data: Partial<TodoFormValues>) =>
  put<Todo, Partial<TodoFormValues>>('/todos/:id', data, {
    pathParams: { id },
  });

export const deleteTodo = (id: number) => del<null>('/todos/:id', { pathParams: { id } });
