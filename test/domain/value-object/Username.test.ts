import { Username } from "@src/domain/value-object/Username.ts";
import { ValueError } from "@src/shared/errors/ValueError.ts";

describe("Username", () => {
  test("should create Username instance with valid value", () => {
    const validUsername = "user_123";
    const username = new Username(validUsername);
    expect(username.toString()).toBe(validUsername);
  });

  test("should throw ValueError if username is less than 2 characters", () => {
    expect(() => new Username("a")).toThrow(ValueError);
    expect(() => new Username("a")).toThrow(
      "Invalid username: must be at least 2 characters and only contain letters, numbers, or underscores.",
    );
  });

  test("should throw ValueError if username contains invalid characters", () => {
    expect(() => new Username("user!")).toThrow(ValueError);
    expect(() => new Username("user!")).toThrow(
      "Invalid username: must be at least 2 characters and only contain letters, numbers, or underscores.",
    );
  });

  test("isValid should return true for valid usernames", () => {
    expect(Username.isValid("user_1")).toBe(true);
    expect(Username.isValid("userName123")).toBe(true);
    expect(Username.isValid("a_2")).toBe(true);
  });

  test("isValid should return false for invalid usernames", () => {
    expect(Username.isValid("a")).toBe(false);
    expect(Username.isValid("!user")).toBe(false);
    expect(Username.isValid("us!er")).toBe(false);
    expect(Username.isValid("")).toBe(false);
  });
});
