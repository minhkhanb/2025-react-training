// src/config/axios/handler.ts
import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import api from './setup';

const refreshToken = async () => {
  try {
    const res = await api.post(
      'api/auth/refresh',
      {},
      {
        withCredentials: true,
      }
    );

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const applyInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      let token = localStorage.getItem('access_token');

      if (token) {
        const date = new Date();
        const decodedToken: JwtPayload = jwtDecode(token);

        if (decodedToken?.exp && decodedToken.exp < date.getTime() / 1000) {
          const data = await refreshToken();

          token = data.accessToken;
        }

        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },

    error => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    error => {
      const { response } = error;

      if (response?.status === 401) {
        console.warn('🔒 Token is expired or invalid');
      }

      return Promise.reject(response?.data || error);
    }
  );
};

export default applyInterceptors;
