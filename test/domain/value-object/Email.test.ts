import { Email } from "@src/domain/value-object/Email.ts";
import { ValueError } from "@src/shared/errors/ValueError.ts";

describe("Email", () => {
  it("should create Email instance with valid email", () => {
    const email = new Email("test@example.com");
    expect(email.toString()).toBe("test@example.com");
  });

  it("should throw ValueError for invalid email", () => {
    expect(() => new Email("invalid-email")).toThrow(ValueError);
    expect(() => new Email("invalid-email")).toThrow("Invalid email address format");
  });

  it("isValid should return true for valid email", () => {
    expect(Email.isValid("user@example.com")).toBe(true);
  });

  it("isValid should return false for invalid email", () => {
    expect(Email.isValid("user@com")).toBe(false);
    expect(Email.isValid("user.com")).toBe(false);
    expect(Email.isValid("")).toBe(false);
  });

  it("equals should return true for same email", () => {
    const email1 = new Email("test@example.com");
    const email2 = new Email("test@example.com");

    expect(email1.equals(email2)).toBe(true);
  });

  it("equals should return false for different emails", () => {
    const email1 = new Email("test@example.com");
    const email2 = new Email("other@example.com");

    expect(email1.equals(email2)).toBe(false);
  });
});
