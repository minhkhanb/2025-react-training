import axios, { AxiosInstance } from 'axios';
import { errorInterceptor } from './interceptors/error.interceptor';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
  },
});

errorInterceptor(axiosInstance.interceptors.response);

export default axiosInstance;
