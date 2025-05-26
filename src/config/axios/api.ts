import axios, { AxiosInstance } from 'axios';
import { jwtInterceptor } from '@src/config/axios/interceptors/jwt.interceptor';
import { errorInterceptor } from '@src/config/axios/interceptors/error.interceptor';

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const registerInterceptors = (axios: AxiosInstance) => {
  jwtInterceptor(axios.interceptors.request);
  errorInterceptor(axios.interceptors.response);
};

registerInterceptors(axiosInstance);

export default axiosInstance;
