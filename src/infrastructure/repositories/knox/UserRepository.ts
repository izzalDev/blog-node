import { UserRepository } from "../../../domain/repositories/UserRepository";
import {
  User,
  CreateUserRequest,
  UpdateUser,
  CreateUser,
} from "../../../domain/entities/User";

export class KnexUserRepository implements UserRepository {
  save(user: User): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findByUsername(username: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  create(user: CreateUser): Promise<User> {
    throw new Error("Method not implemented.");
  }
  update(id: string, user: UpdateUser): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
