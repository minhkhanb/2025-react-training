import axios from 'axios';
import { requestInterceptor } from './interceptors/requestInterceptor';
import { responseInterceptor } from './interceptors/responseInterceptor';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(requestInterceptor, err => Promise.reject(err));
api.interceptors.response.use(responseInterceptor.onSuccess, responseInterceptor.onError);

export default api;
