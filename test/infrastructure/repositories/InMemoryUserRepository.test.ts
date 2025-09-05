import { InMemoryUserRepository } from "@src/infrastructure/repositorie/InMemoryUserRepository.ts";
import { User } from "@src/domain/entities/User.ts";
import { Username } from "@src/domain/value-object/Username.ts";
import { Email } from "@src/domain/value-object/Email.ts";
import { Password } from "@src/domain/value-object/Password.ts";

describe("InMemoryUserRepository", () => {
  let repository: InMemoryUserRepository;
  let user: User;

  beforeEach(async () => {
    repository = new InMemoryUserRepository();

    const username = new Username("testuser");
    const email = new Email("test@example.com");
    const password = await Password.create("ValidPassw0rd!");

    user = User.create(username, email, password);
    await repository.save(user);
  });

  it("should find user by username", async () => {
    const result = await repository.findByUsername(user.username);
    expect(result).toEqual(user);
  });

  it("should return null for unknown username", async () => {
    const unknownUsername = new Username("unknown");
    const result = await repository.findByUsername(unknownUsername);
    expect(result).toBeNull();
  });

  it("should find user by email", async () => {
    const result = await repository.findByEmail(user.email);
    expect(result).toEqual(user);
  });

  it("should return null for unknown email", async () => {
    const unknownEmail = new Email("unknown@example.com");
    const result = await repository.findByEmail(unknownEmail);
    expect(result).toBeNull();
  });

  it("should overwrite user on save with same username", async () => {
    const newEmail = new Email("new@example.com");
    const newPassword = await Password.create("NewPassw0rd!");

    const newUser = User.create(user.username, newEmail, newPassword);
    await repository.save(newUser);

    const resultByUsername = await repository.findByUsername(user.username);
    expect(resultByUsername).toEqual(newUser);

    const resultByEmail = await repository.findByEmail(newEmail);
    expect(resultByEmail).toEqual(newUser);
  });
});
