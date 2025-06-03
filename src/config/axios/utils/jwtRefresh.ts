import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from './tokenManager';
import { JWT_REFRESH_CONFIG } from '../constants';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

type QueueItem = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
}

async function refreshAccessToken(axiosInstance: AxiosInstance) {
  const refreshToken = tokenManager.getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available');
  try {
    const response = await axiosInstance.post(JWT_REFRESH_CONFIG.REFRESH_TOKEN_ENDPOINT, {
      refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    tokenManager.setTokens(accessToken, newRefreshToken);
    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    tokenManager.removeTokens();
    throw error;
  }
}

function logout() {
  tokenManager.removeTokens();
  if (typeof window !== 'undefined') {
    window.location.href = JWT_REFRESH_CONFIG.LOGIN_REDIRECT_PATH;
  }
}

function setAuthHeader(config: RetryableRequestConfig, token: string) {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
}

export async function handleTokenRefresh(
  originalRequest: RetryableRequestConfig,
  axiosInstance: AxiosInstance
): Promise<unknown> {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(token => {
      setAuthHeader(originalRequest, token as string);
      return axiosInstance(originalRequest);
    });
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    const { accessToken } = await refreshAccessToken(axiosInstance);
    setAuthHeader(originalRequest, accessToken);
    processQueue(null, accessToken);
    return axiosInstance(originalRequest);
  } catch (refreshError) {
    processQueue(refreshError, null);
    logout();
    throw refreshError;
  } finally {
    isRefreshing = false;
  }
}
