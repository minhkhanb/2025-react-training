import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import api from './setup';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

const addSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const refreshToken = async (): Promise<string> => {
  try {
    const res = await api.post(
      'api/auth/refresh',
      {},
      {
        withCredentials: true,
      }
    );

    return res.data.accessToken;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error?.response?.data;
  }
};

const applyInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('access_token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const newToken = await refreshToken();

            localStorage.setItem('access_token', newToken);

            onRefreshed(newToken);

            isRefreshing = false;

            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            return api(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            refreshSubscribers = [];

            return Promise.reject(refreshError);
          }
        }

        return new Promise(resolve => {
          addSubscriber((token: string) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = `Bearer ${token}`;

            resolve(api(originalRequest));
          });
        });
      }

      return Promise.reject(error.response?.data || error);
    }
  );
};

export default applyInterceptors;
