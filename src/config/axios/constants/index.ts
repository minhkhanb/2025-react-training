export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export type MethodType = (typeof METHODS)[keyof typeof METHODS];

export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  BASE_DELAY_MS: 1000,
} as const;

export const JWT_REFRESH_CONFIG = {
  LOGIN_REDIRECT_PATH: '/auth/login',
  REFRESH_TOKEN_ENDPOINT: '/auth/refresh',
} as const;
