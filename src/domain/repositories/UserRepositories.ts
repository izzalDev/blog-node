import type { User } from "../entities/User.ts";
import type { Email } from "../value-object/Email.ts";
import type { Username } from "../value-object/Username.ts";

export interface UserRepository {
  findByEmail(email: Email): Promise<User | null>;
  findByUsername(username: Username): Promise<User | null>;
  save(user: User): Promise<User>;
}
