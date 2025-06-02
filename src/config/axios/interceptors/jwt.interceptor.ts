import {
  AxiosError,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { tokenManager } from '@src/config/axios/utils/tokenManager';

export const jwtRequestInterceptor = (
  request: AxiosInterceptorManager<InternalAxiosRequestConfig>
) => {
  request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenManager.getAccessToken();

      if (token) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        } as InternalAxiosRequestConfig;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

export const jwtResponseInterceptor = (
  response: AxiosInterceptorManager<AxiosResponse>,
  axiosInstance: AxiosInstance
) => {
  let isRefreshing = false;
  let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    failedQueue = [];
  };

  const refreshAccessToken = async (): Promise<{ accessToken: string; refreshToken: string }> => {
    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axiosInstance.post('/auth/refresh', {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      tokenManager.setTokens(accessToken, newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      tokenManager.removeTokens();
      throw error;
    }
  };

  const logout = () => {
    tokenManager.removeTokens();

    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  };

  response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return axiosInstance(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { accessToken } = await refreshAccessToken();

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          processQueue(null, accessToken);

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          logout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (error.response?.status === 403) {
        console.warn('Access forbidden - insufficient permissions', error.response.data);
      }

      return Promise.reject(error);
    }
  );
};

export const setupJWTInterceptors = (axiosInstance: AxiosInstance) => {
  jwtRequestInterceptor(axiosInstance.interceptors.request);
  jwtResponseInterceptor(axiosInstance.interceptors.response, axiosInstance);
};
