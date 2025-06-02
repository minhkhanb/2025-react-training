export type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export type error = { response?: { data?: { message?: string } }; message?: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse<T = any> = {
  data: T | null;
  message: string[];
  error: boolean;
};
