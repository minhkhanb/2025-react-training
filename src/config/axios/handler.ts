/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@src/modules/toast';
import axiosInstance from './setup';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

interface ErrorResponse {
  message: string;
}

interface SuccessResponse<T> {
  response: T;
  message?: string;
}

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

    const response = await axiosInstance.request<SuccessResponse<T>>({
      method,
      url: endpoint,
      data,
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });

    const result = response.data;

    if (result.message) {
      toast({ title: 'Success', message: result.message, duration: 3000, type: 'success' });
    }

    return result.response;
  } catch (error: unknown) {
    const message = (error as ErrorResponse).message || 'Something went wrong';
    toast({ title: 'Error', message, duration: 3000, type: 'error' });
  }
};
