import { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from './api';
import { compileUrl } from '@src/config/axios/utils/urlParser';
import { ObjectToFormData } from '@src/config/axios/utils/formDataCompiler';

type RequestOptions = {
  headers?: AxiosRequestConfig['headers'];
  useFormData?: boolean;
  params?: Record<string, unknown>;
};

const REQUEST_TYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DEL: 'DEL',
};

type QueryParams = {
  [key: string]: string;
};

/**
 * Requests to API
 * @param {String} type
 * @param {String} endpoint
 * @param {Object} queryParam
 * @param {Object} data
 * If you wish to send FormData instead of JSON, set options.useFormData to true.
 * @param options
 */
const request = <T>(
  type: string,
  endpoint: string,
  queryParam = {},
  data = {},
  options: RequestOptions = { useFormData: false }
): Promise<AxiosResponse<T>> => {
  let req;
  const url = compileUrl(endpoint, queryParam);
  let formData = { ...data };
  const reqOptions: RequestOptions = { ...options };

  if (options.useFormData) {
    formData = ObjectToFormData({ ...data });
    reqOptions.headers = { 'Content-Type': 'multipart/form-data' };
  }

  switch (type) {
    case REQUEST_TYPE.POST:
      req = apiClient.post(url, formData, reqOptions);
      break;

    case REQUEST_TYPE.PUT:
      req = apiClient.put(url, formData, reqOptions);
      break;

    case REQUEST_TYPE.DEL:
      req = apiClient.delete(url, { data: formData, ...reqOptions });
      break;

    default:
      req = apiClient.get(url, reqOptions);
      break;
  }

  return req;
};

/**
 * Send GET Request to API
 * @param {String} url
 * @param {Object} queryParam
 * @param {AxiosRequestConfig} options
 */
const get = <T>(
  url: string,
  queryParam = {},
  options: RequestOptions = { useFormData: false }
): Promise<AxiosResponse<T>> => request(REQUEST_TYPE.GET, url, queryParam, undefined, options);

/**
 * Send POST Request to API
 * @param {String} url
 * @param {Object} queryParam
 * @param {Object} data
 * @param {AxiosRequestConfig} options
 * If you wish to send FormData instead of JSON, set options.useFormData to true.
 */
const post = <T>(
  url: string,
  queryParam = {},
  data = {},
  options: { useFormData: boolean } = { useFormData: false }
): Promise<AxiosResponse<T>> => request(REQUEST_TYPE.POST, url, queryParam, data, options);

/**
 * Send PUT Request to API
 * @param {String} url
 * @param queryParams
 * @param {Object} data
 * @param {AxiosRequestConfig} options
 * If you wish to send FormData instead of JSON, set options.useFormData to true.
 */
const put = <T>(
  url: string,
  queryParams: QueryParams = {},
  data = {},
  options: { useFormData: boolean } = { useFormData: false }
): Promise<AxiosResponse<T>> => request(REQUEST_TYPE.PUT, url, queryParams, data, options);

/**
 * Send DELETE Request to API
 * @param {String} url
 * @param queryParams
 * @param data
 * @param {AxiosRequestConfig} options
 */
const remove = <T>(
  url: string,
  queryParams: QueryParams = {},
  data = {},
  options: { useFormData: boolean } = { useFormData: false }
): Promise<AxiosResponse<T>> => request(REQUEST_TYPE.DEL, url, queryParams, data, options);

export default {
  get,
  post,
  put,
  delete: remove,
};
