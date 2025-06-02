import { AxiosError, AxiosInterceptorManager, AxiosResponse } from 'axios';

export interface ApiErrorResponse {
  status: number;
  message: string;
}

const createErrorResponse = (error: AxiosError): ApiErrorResponse => {
  if (!error.response) {
    return {
      status: 0,
      message: 'Network error. Please check your connection.',
    };
  }

  const status = error.response?.status || 500;
  const data = error.response?.data as { message?: string } | undefined;

  return {
    status,
    message: data?.message || getDefaultErrorMessage(status),
  };
};

const getDefaultErrorMessage = (status: number): string => {
  const messages: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    422: 'Unprocessable Entity',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };

  return messages[status] || 'An error occurred';
};

export const errorInterceptor = (response: AxiosInterceptorManager<AxiosResponse>) => {
  response.use(
    (data: AxiosResponse) => data,
    (error: AxiosError) => {
      const errorResponse = createErrorResponse(error);

      return Promise.reject(errorResponse);
    }
  );
};
