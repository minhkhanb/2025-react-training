import api from '@/config/axios/setup';
import {
  getTotalTodosAndTotalFinishTodosResponse,
  PaginatedTodosResponse,
  TodoValue,
} from '../types/ITodoList';
import { ApiResponse } from '../types/common';

export const getAllTodo = async (
  page: number,
  totalPerPage: number,
  sortType: string,
  sortColumn: string
): Promise<PaginatedTodosResponse> => {
  const res = await api.get<PaginatedTodosResponse>(
    `api/todos?page=${page}&limit=${totalPerPage}&sortType=${sortType}&sortColumn=${sortColumn}`
  );

  return res.data;
};

export const getTotalTodosAndTotalFinishTodos =
  async (): Promise<getTotalTodosAndTotalFinishTodosResponse> => {
    const res = await api.get<getTotalTodosAndTotalFinishTodosResponse>(`api/todos/total`);

    return res.data;
  };

export const getTodoById = async (id: string): Promise<ApiResponse<TodoValue>> => {
  const res = await api.get<ApiResponse<TodoValue>>(`api/todos/${id}`);

  return res.data;
};

export const createTodo = async (newTodo: TodoValue): Promise<ApiResponse<TodoValue>> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...newObj } = newTodo;

  const res = await api.post<ApiResponse<TodoValue>>('/api/todos', newObj);

  return res.data;
};

export const updateStatusTodo = async ({
  id,
  status,
}: {
  id: string;
  status: 'todo' | 'in-progress' | 'done';
}): Promise<ApiResponse<TodoValue>> => {
  const res = await api.patch<ApiResponse<TodoValue>>(`/api/todos/${id}/status`, { status });

  return res.data;
};

export const updateTodo = async ({
  todo,
}: {
  todo: TodoValue;
}): Promise<ApiResponse<TodoValue>> => {
  const { id, ...newObj } = todo;

  const res = await api.put<ApiResponse<TodoValue>>(`/api/todos/${id}`, { ...newObj });

  return res.data;
};

export const deleteTodo = async ({ id }: { id: string }): Promise<ApiResponse<TodoValue>> => {
  const res = await api.delete<ApiResponse<TodoValue>>(`/api/todos/${id}`);

  return res.data;
};
