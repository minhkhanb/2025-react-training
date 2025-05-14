/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@src/modules/toast';
import axiosInstance from './setup';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export const callApi = async <T>({
  method,
  endpoint,
  data,
}: {
  method: HttpMethod;
  endpoint: string;
  data?: any;
}): Promise<T | undefined> => {
  try {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

    const response = await axiosInstance.request<T>({
      method,
      url: endpoint,
      data,
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });

    return response.data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An error occurred while calling the API.';
    toast({ title: 'Error', message, duration: 3000, type: 'error' });
  }
};
