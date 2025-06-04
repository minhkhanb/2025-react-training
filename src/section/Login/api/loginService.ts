import { post } from '@/config/axios';
import { LoginResponseValues, LoginValues } from '../types/ILogin';

export const login = async ({ email, password }: LoginValues) => {
  try {
    const res = await post<LoginResponseValues, LoginValues>('api/auth/login', { email, password });

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.message || error;
  }
};
