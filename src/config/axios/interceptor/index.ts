import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export function requestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  return config;
}

export function responseInterceptor(response: AxiosResponse) {
  return response;
}
