import axios from 'axios';
import {
  Todo,
  ParamsProps,
  CreateTodoType,
  UpdateTodoType,
} from '@/src/@types/todo.types';
import { filterValidParams } from '@/src/utils';

export const getTodos = async (params: ParamsProps) => {
  const filteredParams = filterValidParams(params);
  const res = await axios.get('/api/todos', { params: filteredParams });
  return res.data;
};

export const createTodo = async (newTodo: CreateTodoType): Promise<Todo> => {
  const res = await axios.post('/api/todos', newTodo);
  return res.data;
};

export const updateTodo = async (
  id: string,
  updatedData: UpdateTodoType
): Promise<Todo> => {
  const res = await axios.put(`/api/todos/${id}`, updatedData);
  return res.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`/api/todos/${id}`);
};
