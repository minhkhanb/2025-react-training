import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { createErrorResponse } from './errorResponse';
import { RETRY_CONFIG } from '../constants';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

export const shouldRetry = (error: AxiosError): boolean => {
  if (!error.response) return true;

  const status = error.response.status;
  return status >= 500 && status <= 599;
};

export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const handleRetryLogic = async (
  error: AxiosError,
  originalRequest: RetryableRequestConfig,
  axiosInstance: AxiosInstance
): Promise<unknown> => {
  const retryCount = originalRequest._retryCount || 0;

  if (retryCount >= RETRY_CONFIG.MAX_RETRIES) {
    return Promise.reject(createErrorResponse(error));
  }

  originalRequest._retryCount = retryCount + 1;

  const delayMs = Math.pow(2, retryCount) * RETRY_CONFIG.BASE_DELAY_MS;

  await delay(delayMs);
  return axiosInstance(originalRequest);
};
