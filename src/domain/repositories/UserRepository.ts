import { User, CreateUser, UpdateUser } from "../entities/User";

export interface UserRepository {
  save(user: User): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: CreateUser): Promise<User>;
  update(id: string, user: UpdateUser): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<User[]>;
}
