import { AxiosInterceptorManager, AxiosResponse } from 'axios';

export const errorInterceptor = (response: AxiosInterceptorManager<AxiosResponse>) => {
  response.use(
    data => data,
    err => {
      return Promise.reject(err);
    }
  );
};
