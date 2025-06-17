export interface Todo {
  id: string;
  title: string;
  subTitle: string;
  note: string;
  createAt: Date;
  updateAt: Date;
}

export interface ParamsProps {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface CreateTodoType {
  title: string;
  subTitle?: string;
  note?: string;
}

export interface UpdateTodoType {
  title?: string;
  subTitle?: string;
  note?: string;
}
