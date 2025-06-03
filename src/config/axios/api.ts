import axios, { AxiosInstance } from 'axios';
import { errorInterceptor } from './interceptors/error.interceptor';
import { jwtRequestInterceptor } from './interceptors/jwt.interceptor';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
    // 'ngrok-skip-browser-warning': 'true',
  },
});

jwtRequestInterceptor(axiosInstance.interceptors.request);
errorInterceptor(axiosInstance.interceptors.response, axiosInstance);

export default axiosInstance;
