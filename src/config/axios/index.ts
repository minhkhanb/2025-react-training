import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './api';
import { ObjectToFormData, FormDataParams } from './utils/formDataComplier';
import { ApiErrorResponse } from './utils/errorResponse';
import { compileParamToUrl, filterQueryParams } from './utils/urlParser';
import { METHODS, MethodType } from './constants';

interface RequestOptions {
  headers?: AxiosRequestConfig['headers'];
  useFormData?: boolean;
  pathParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number>;
}

export async function request<T, D = unknown>(config: {
  method: MethodType;
  endpoint: string;
  data?: D;
  options?: RequestOptions;
}): Promise<T> {
  try {
    const { method, endpoint, data, options } = config;
    const { headers = {}, useFormData = false, pathParams, queryParams } = options || {};

    const url = compileParamToUrl(endpoint, pathParams);

    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      params: filterQueryParams(queryParams),
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
  request<T>({ method: METHODS.GET, endpoint, options });

export const post = <T, D = unknown>(endpoint: string, data?: D, options?: RequestOptions) =>
  request<T, D>({ method: METHODS.POST, endpoint, data, options });

export const put = <T, D = unknown>(endpoint: string, data?: D, options?: RequestOptions) =>
  request<T, D>({ method: METHODS.PUT, endpoint, data, options });

export const del = <T>(endpoint: string, options?: RequestOptions) =>
  request<T>({ method: METHODS.DELETE, endpoint, options });
