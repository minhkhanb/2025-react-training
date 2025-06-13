export interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  lastLoginAt: Date;
  loginAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}
