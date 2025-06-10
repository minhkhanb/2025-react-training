export interface Todo {
  id: string;
  title: string;
  subTitle: string;
  note: string;
  createAt: Date;
  updateAt: Date;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}
