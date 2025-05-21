import api from '@/config/axios/setup';
import { TodoValue } from '../types/ITodoList';

export const getAllTodo = async (page: number) => {
  try {
    const res = await api.get<TodoValue>(`api/todos?page=${page}&limit=5`);

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
    const { _id, isFinish, ...newObj } = newTodo;

    const res = await api.post<TodoValue>('/api/todos', newObj);

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};

export const updateStatusTodo = async ({ _id }: { _id: string }) => {
  try {
    const res = await api.patch<TodoValue>(`/api/todos/${_id}/status`);

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};

export const updateTodo = async ({ _id, message }: { _id: string; message: string }) => {
  try {
    const res = await api.patch<TodoValue>(`/api/todos/${_id}`, { message });

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};

export const deleteTodo = async ({ _id }: { _id: string }) => {
  try {
    const res = await api.delete<TodoValue>(`/api/todos/${_id}`);

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};
