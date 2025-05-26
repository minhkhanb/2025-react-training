import axios from 'axios';
import handlers from '@src/config/axios/globalHandler';

export const configure = () => {
  axios.interceptors.request.use(handlers.preRequest);
  axios.interceptors.response.use(undefined, handlers.errorResponse);
};
