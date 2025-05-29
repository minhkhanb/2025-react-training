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
  try {
    const res = await api.get<PaginatedTodosResponse>(
      `api/todos?page=${page}&limit=${totalPerPage}&sortType=${sortType}&sortColumn=${sortColumn}`
    );

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};

export const getTotalTodosAndTotalFinishTodos = async () => {
  try {
    const res = await api.get<getTotalTodosAndTotalFinishTodosResponse>(`api/todos/total`);

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};

export const getTodoById = async (id: string) => {
  try {
    const res = await api.get<TodoValue>(`api/todos/${id}`);

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};

export const createTodo = async (newTodo: TodoValue) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...newObj } = newTodo;

    const res = await api.post<TodoValue>('/api/todos', newObj);

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};

export const updateStatusTodo = async ({
  id,
  status,
}: {
  id: string;
  status: 'todo' | 'in-progress' | 'done';
}) => {
  try {
    const res = await api.patch<TodoValue>(`/api/todos/${id}/status`, { status });

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};

export const updateTodo = async ({ todo }: { todo: TodoValue }) => {
  try {
    const { id, ...newObj } = todo;
    console.log('updateTodo', newObj);

    const res = await api.put<TodoValue>(`/api/todos/${id}`, { ...newObj });

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};

export const deleteTodo = async ({ id }: { id: string }) => {
  try {
    const res = await api.delete<TodoValue>(`/api/todos/${id}`);

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};
