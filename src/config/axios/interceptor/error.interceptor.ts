import { AxiosError } from 'axios';

export function responseErrorInterceptor(error: AxiosError): Promise<never> {
  if (error.response?.status === 401) {
    console.error('Unauthorized, redirecting to login...');
  }
  return Promise.reject(error);
}
