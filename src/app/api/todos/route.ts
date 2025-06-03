import { get, post, put, del } from '@src/config/axios';
import { Todo, TodoFormValues, PaginatedResponse } from '@src/types/todo';

export const getTodos = (params: { page: number; limit: number }) =>
  get<PaginatedResponse<Todo>>('/todos', { queryParams: params });

export const getTodoById = (id: string) => get<Todo>('/todos/:id', { pathParams: { id } });

export const createTodo = (data: TodoFormValues) => post<Todo, TodoFormValues>('/todos', data);

export const updateTodo = (id: string, data: Partial<TodoFormValues>) =>
  put<Todo, Partial<TodoFormValues>>('/todos/:id', data, {
    pathParams: { id },
  });

export const deleteTodo = (id: string) => del<null>('/todos/:id', { pathParams: { id } });
