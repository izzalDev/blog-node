import type { User } from "@src/domain/entities/User.ts";
import type { UserRepository } from "@src/domain/repositories/UserRepositories.ts";
import type { Email } from "@src/domain/value-object/Email.ts";
import type { Username } from "@src/domain/value-object/Username.ts";

export class InMemoryUserRepository implements UserRepository {
  private readonly byUserName = new Map<string, User>();
  private readonly byEmail = new Map<string, User>();

  findByEmail(email: Email): Promise<User | null> {
    const user = this.byEmail.get(email.toString());
    return Promise.resolve(user ?? null);
  }
  findByUsername(username: Username): Promise<User | null> {
    const user = this.byUserName.get(username.toString());
    return Promise.resolve(user ?? null);
  }
  save(user: User): Promise<User> {
    this.byUserName.set(user.username.toString(), user);
    this.byEmail.set(user.email.toString(), user);
    return Promise.resolve(user);
  }
}
