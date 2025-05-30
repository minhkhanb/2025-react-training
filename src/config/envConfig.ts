const envConfig = {
  MODE: process.env.NODE_ENV,
  REST_API_URL: process.env.NEXT_PUBLIC_REST_API_URL,
};

export const config = {
  get REST_API_URL() {
    return getVal('REST_API_URL');
  },
  get MODE() {
    return getVal('MODE');
  },
};

const getVal = <T = string>(key: keyof typeof envConfig, transform?: (val: string) => T) => {
  const val = envConfig[key];

  if (!val) {
    configWarning(key);
    return '';
  }
  if (transform) {
    return transform(val);
  }

  return val;
};

const configWarning = (configKey: keyof typeof envConfig) => {
  if (envConfig.MODE !== 'production') {
    console.warn(
      `You are running the application in ${envConfig.MODE} mode. Unable to retrieve ${configKey} configuraton value.`
    );
  }
};
