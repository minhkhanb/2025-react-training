import { AxiosInterceptorManager, InternalAxiosRequestConfig } from 'axios';

export const jwtInterceptor = (request: AxiosInterceptorManager<InternalAxiosRequestConfig>) => {
  request.use(config => {
    const token = null; // Replace with your token retrieval logic

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
  });
};
