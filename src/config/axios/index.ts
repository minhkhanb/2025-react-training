import api from './instance';

export const get = <T = unknown>(url: string, config = {}) => {
  return api.get<T>(url, config);
};

export const post = <T = unknown, D = unknown>(url: string, data: D, config = {}) => {
  return api.post<T>(url, data, config);
};

export const put = <T = unknown, D = unknown>(url: string, data: D, config = {}) => {
  return api.put<T>(url, data, config);
};

export const patch = <T = unknown, D = unknown>(url: string, data: D, config = {}) => {
  return api.patch<T>(url, data, config);
};

export const remove = <T = unknown>(url: string, config = {}) => {
  return api.delete<T>(url, config);
};

export const postJson = <T = unknown, D = unknown>(url: string, data: D) => {
  return api.post<T>(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const uploadFile = <T = unknown>(url: string, formData: FormData) => {
  return api.post<T>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getWithAuth = <T = unknown>(url: string) => {
  const token = localStorage.getItem('access_token');
  return api.get<T>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
