import { User } from "@src/domain/entities/User.ts";
import { Email } from "@src/domain/value-object/Email.ts";
import { Username } from "@src/domain/value-object/Username.ts";
import { Password } from "@src/domain/value-object/Password.ts";

describe("User Entity", () => {
  const validEmail = new Email("test@example.com");
  const validUsername = new Username("validUser");
  const validPlainTextPassword = "oke123@Password";
  let validPassword: Password;

  beforeEach(async () => {
    validPassword = await Password.create(validPlainTextPassword);
  });

  it("should create a new user with correct properties", () => {
    const user = User.create(validUsername, validEmail, validPassword);
    expect(user.id).toBe(undefined);
    expect(user.email.toString()).toBe("test@example.com");
    expect(user.username.toString()).toBe("validUser");
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.modifiedAt).toBeInstanceOf(Date);
  });

  it("should update username and update modifiedAt", async () => {
    const user = User.create(validUsername, validEmail, validPassword);
    const oldModifiedAt = user.modifiedAt;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newUsername = new Username("newUser");
    user.username = newUsername;
    expect(user.username.toString()).toBe("newUser");
    expect(user.modifiedAt.getTime()).toBeGreaterThan(oldModifiedAt.getTime());
  });

  it("should update password and update modifiedAt", async () => {
    const user = User.create(validUsername, validEmail, validPassword);
    const oldModifiedAt = user.modifiedAt;
    const newPassword = await Password.create("@NewPass123");
    user.password = newPassword;
    expect(user.password).toBe(newPassword);
    expect(user.modifiedAt.getTime()).toBeGreaterThan(oldModifiedAt.getTime());
  });

  it("toJson() should return expected object", () => {
    const user = User.loadExisting(
      "user-id-123",
      validUsername,
      validEmail,
      validPassword,
      new Date(),
      new Date(),
    );
    const json = user.toJson();
    expect(json).toMatchObject({
      id: "user-id-123",
      email: "test@example.com",
      username: "validUser",
      createdAt: user.createdAt.toISOString(),
      modifiedAt: user.modifiedAt.toISOString(),
    });
  });
});
