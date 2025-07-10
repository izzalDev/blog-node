export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface CreateUser {
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name?: string;
}

export interface UpdateUser {
  username?: string;
  email?: string;
  passwordHash?: string;
  updatedAt?: Date;
  name?: string;
}
