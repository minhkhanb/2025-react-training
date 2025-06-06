import { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from '../tokenManager';

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
};
