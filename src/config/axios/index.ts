import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './api';
import { ObjectToFormData, FormDataParams } from './utils/formDataComplier';
import { ApiErrorResponse } from './interceptors/error.interceptor';
import { compileParamToUrl } from './utils/urlParser';

type RequestOptions = {
  headers?: AxiosRequestConfig['headers'];
  useFormData?: boolean;
  pathParams?: Record<string, string | number>;
  queryParam?: Record<string, string | number>;
};

export async function request<T, D = unknown>(config: {
  method: 'get' | 'post' | 'put' | 'delete';
  endpoint: string;
  data?: D;
  options?: RequestOptions;
}): Promise<T> {
  try {
    const { method, endpoint, data, options } = config;
    const { headers = {}, useFormData = false, pathParams, queryParam } = options || {};

    const url = compileParamToUrl(endpoint, pathParams);

    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      params: queryParam,
      headers,
      data: useFormData ? ObjectToFormData(data as FormDataParams) : data,
    };

    const response: AxiosResponse<T> = await axiosInstance.request(requestConfig);
    return response.data;
  } catch (error) {
    throw error as ApiErrorResponse;
  }
}

export const get = <T>(endpoint: string, options?: RequestOptions) =>
  request<T>({ method: 'get', endpoint, options });

export const post = <T, D = unknown>(endpoint: string, data?: D, options?: RequestOptions) =>
  request<T, D>({ method: 'post', endpoint, data, options });

export const put = <T, D = unknown>(endpoint: string, data?: D, options?: RequestOptions) =>
  request<T, D>({ method: 'put', endpoint, data, options });

export const del = <T>(endpoint: string, options?: RequestOptions) =>
  request<T>({ method: 'delete', endpoint, options });
