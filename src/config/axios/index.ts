import axiosInstance from './api';

export const get = async <T>(
  endpoint: string,
  params?: Record<string, T>
): Promise<T[]> => {
  const res = await axiosInstance.get<T[]>(endpoint, {
    params,
  });
  return res.data;
};

export const create = async <T extends Partial<T>>(
  endpoint: string,
  data: T
): Promise<T> => {
  const res = await axiosInstance.post<T>(endpoint, data);
  return res.data;
};

export const update = async <T>(
  endpoint: string,
  data: T & { id: string }
): Promise<T> => {
  const res = await axiosInstance.put<T>(`${endpoint}/${data.id}`, data);
  return res.data;
};

export const remove = async (endpoint: string, id: string): Promise<void> => {
  await axiosInstance.delete(`${endpoint}/${id}`);
};
