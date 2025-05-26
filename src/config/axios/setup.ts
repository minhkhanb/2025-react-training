import axios from 'axios';
import handlers from '@src/config/axios/globalHandler';

const configure = () => {
  axios.interceptors.request.use(handlers.preRequest);
  axios.interceptors.response.use(undefined, handlers.errorResponse);
};

export default { configure };
