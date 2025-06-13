import { post } from '@src/config/axios';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@src/types/auth';

export const logIn = (data: LoginRequest) => post<LoginResponse, LoginRequest>('/auth/login', data);

export const register = (data: RegisterRequest) =>
  post<RegisterResponse, RegisterRequest>('/auth/register', data);
