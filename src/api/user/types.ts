export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserParams = {
  page?: string;
  limt?: string;
  sort?: string;
};

export type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateUserInput = {
  payload: CreateUserRequest;
};
