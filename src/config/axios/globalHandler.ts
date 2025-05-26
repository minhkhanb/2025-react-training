import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@src/stores';

const handlers = {
  async preRequest(request: InternalAxiosRequestConfig) {
    request.headers = request.headers ?? {};

    if (
      typeof request.data === 'undefined' &&
      !['get', 'head'].includes(request.method?.toLowerCase() ?? '')
    ) {
      request.data = {};
    }

    if (request.withCredentials === false) {
      return request;
    }

    const authStore = useAuthStore.getState();
    let accessToken = await authStore.getAccessToken();

    if (!accessToken) {
      throw new axios.Cancel('No access token available');
    }

    if (request.url?.startsWith('http://api')) {
      accessToken = 'Bearer ' + accessToken;
    }

    return request;
  },
  async errorResponse(error: AxiosError & { handledGlobally: boolean }) {
    const authStore = useAuthStore.getState();

    if (error.message === 'No access token available') {
      error.handledGlobally = true;

      await authStore.logout();
    }

    return Promise.reject(error);
  },
};

export default handlers;
