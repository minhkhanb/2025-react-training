import { AxiosInstance } from 'axios';
import api from './instance';

import { InternalAxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type Subscriber = {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
};

let isRefreshing = false;
let subscribers: Subscriber[] = [];

export const getAccessToken = () => localStorage.getItem('access_token');
export const setAccessToken = (token: string) => localStorage.setItem('access_token', token);

const onRefreshed = (token: string) => {
  subscribers.forEach(({ resolve }) => resolve(token));
  subscribers = [];
};

const onRefreshFailed = (error: unknown) => {
  subscribers.forEach(({ reject }) => reject(error));
  subscribers = [];
};

export const addSubscriber = (subscriber: Subscriber) => {
  subscribers.push(subscriber);
};

export const refreshToken = async (): Promise<string> => {
  try {
    const res = await api.post('/api/auth/refresh', {}, { withCredentials: true });

    const newToken = res.data.accessToken;

    setAccessToken(newToken);

    onRefreshed(newToken);

    return newToken;
  } catch (error) {
    onRefreshFailed(error);

    throw error;
  } finally {
    isRefreshing = false;
  }
};

export const handle401 = async (originalRequest: CustomAxiosRequestConfig, api: AxiosInstance) => {
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const newToken = await refreshToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return new Promise((resolve, reject) => {
    addSubscriber({
      resolve: (token: string) => {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        resolve(api(originalRequest));
      },
      reject: (err: unknown) => {
        reject(err);
      },
    });
  });
};
