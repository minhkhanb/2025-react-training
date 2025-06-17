import axios from 'axios';
import { requestInterceptor, responseInterceptor } from './interceptor';
import { responseErrorInterceptor } from './interceptor/error.interceptor';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

export default axiosInstance;
