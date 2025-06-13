import { User } from './user';
import { BaseResponse } from './base';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface LoginResponse extends BaseResponse {
  data: {
    user: User;
    expiresIn: number;
  };
}

export type RegisterResponse = LoginResponse;
