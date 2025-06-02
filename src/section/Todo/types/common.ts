export type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export type error = { response?: { data?: { message?: string } }; message?: string };
