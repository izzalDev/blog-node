import type { User } from "../entities/User";
import type { Email } from "../value-object/Email";
import type { Username } from "../value-object/Username";

export interface UserRepository {
  findByEmail(email: Email): Promise<User | null>;
  findByUsername(username: Username): Promise<User | null>;
  save(user: User): Promise<User>;
}
