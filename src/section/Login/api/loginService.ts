import api from '@/config/axios/setup';
import { LoginResponseValues, LoginValues } from '../types/ILogin';

export const login = async ({ email, password }: LoginValues) => {
  try {
    const res = await api.post<LoginResponseValues>('api/auth/login', { email, password });

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};
