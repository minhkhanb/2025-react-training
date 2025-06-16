import { get, post, put, del } from '@src/config/axios';
import { RegisterRequest } from '@src/types/auth';
import { PaginatedResponse } from '@src/types/todo';
import { User } from '@src/types/user';

export const getUsers = (params: {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortOrder: string;
}) => get<PaginatedResponse<User>>('/users', { queryParams: params });

export const createUser = (data: RegisterRequest) => post<User>('/users', data);

export const updateUser = (id: string, data: RegisterRequest) => put<User>(`/users/${id}`, data);

export const deleteUser = (id: string) => del<User>(`/users/${id}`);
