const configureAxios = () => {};

const configPolyfills = () => {};

export const getReactQueryClient = () => {};

const configureDayJs = () => {};

const configureApp = async () => {
  configPolyfills();
  configureAxios();
  configureDayJs();
};

export default configureApp;
