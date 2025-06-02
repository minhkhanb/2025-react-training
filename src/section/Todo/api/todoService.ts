import api from '@/config/axios/setup';
import {
  getTotalTodosAndTotalFinishTodosResponse,
  PaginatedTodosResponse,
  TodoValue,
} from '../types/ITodoList';

export const getAllTodo = async (
  page: number,
  totalPerPage: number,
  sortType: string,
  sortColumn: string
) => {
  const res = await api.get<PaginatedTodosResponse>(
    `api/todos?page=${page}&limit=${totalPerPage}&sortType=${sortType}&sortColumn=${sortColumn}`
  );

  return res.data;
};

export const getTotalTodosAndTotalFinishTodos = async () => {
  const res = await api.get<getTotalTodosAndTotalFinishTodosResponse>(`api/todos/total`);

  return res.data;
};

export const getTodoById = async (id: string) => {
  const res = await api.get<TodoValue>(`api/todos/${id}`);

  return res.data;
};

export const createTodo = async (newTodo: TodoValue) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...newObj } = newTodo;

  const res = await api.post<TodoValue>('/api/todos', newObj);

  return res.data;
};

export const updateStatusTodo = async ({
  id,
  status,
}: {
  id: string;
  status: 'todo' | 'in-progress' | 'done';
}) => {
  const res = await api.patch<TodoValue>(`/api/todos/${id}/status`, { status });

  return res.data;
};

export const updateTodo = async ({ todo }: { todo: TodoValue }) => {
  const { id, ...newObj } = todo;

  const res = await api.put<TodoValue>(`/api/todos/${id}`, { ...newObj });

  return res.data;
};

export const deleteTodo = async ({ id }: { id: string }) => {
  const res = await api.delete<TodoValue>(`/api/todos/${id}`);

  return res.data;
};
