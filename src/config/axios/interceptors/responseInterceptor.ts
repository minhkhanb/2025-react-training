import { AxiosError, AxiosResponse } from 'axios';
import { CustomAxiosRequestConfig, handle401 } from '../tokenManager';
import api from '../instance';

export const responseInterceptor = {
  onSuccess: (response: AxiosResponse) => response,
  onError: async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return handle401(originalRequest, api);
    }

    return Promise.reject(error.response?.data || error);
  },
};
