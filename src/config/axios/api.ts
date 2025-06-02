import axios, { AxiosInstance } from 'axios';
import { errorInterceptor } from './interceptors/error.interceptor';
import { setupJWTInterceptors } from './interceptors/jwt.interceptor';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
    // 'ngrok-skip-browser-warning': 'true',
  },
});

errorInterceptor(axiosInstance.interceptors.response);
setupJWTInterceptors(axiosInstance);

export default axiosInstance;
