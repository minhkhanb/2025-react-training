import { AxiosInterceptorManager, InternalAxiosRequestConfig } from 'axios';
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
