import { AxiosError, InternalAxiosRequestConfig } from 'axios';

const handlers = {
  async preRequest(request: InternalAxiosRequestConfig) {
    return request;
  },
  async errorResponse(error: AxiosError & { handledGlobally: boolean }) {
    return Promise.reject(error);
  },
};

export default handlers;
