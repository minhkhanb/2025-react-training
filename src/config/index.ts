import axios from './axios/setup';

const configureAxios = () => {
  axios.configure();
};

const configPolyfills = () => {};

export const getReactQueryClient = () => {};

const configureDayJs = () => {};

const configureApp = async () => {
  configPolyfills();
  configureAxios();
  configureDayJs();
};

export default configureApp;
