import { Password } from "@src/domain/value-object/Password";
import { ValueError } from "@src/shared/errors/ValueError";

describe("Password", () => {
  describe("isValid", () => {
    it("should return true for valid passwords", () => {
      expect(Password.isValid("Valid123!")).toBe(true);
      expect(Password.isValid("Another$Pass1")).toBe(true);
    });

    it("should return false for invalid passwords", () => {
      expect(Password.isValid("short1!")).toBe(false);
      expect(Password.isValid("nocaps123!")).toBe(false);
      expect(Password.isValid("NOLOWER123!")).toBe(false);
      expect(Password.isValid("NoSpecials123")).toBe(false);
      expect(Password.isValid("NoNumbers!")).toBe(false);
    });
  });

  describe("create", () => {
    it("should throw ValueError if password is invalid", async () => {
      await expect(Password.create("invalid")).rejects.toThrow(ValueError);
    });

    it("should create Password instance for valid password", async () => {
      const password = await Password.create("Valid123!");
      expect(password).toBeInstanceOf(Password);
    });
  });

  describe("compare", () => {
    it("should return true for matching passwords", async () => {
      const plainPassword = "Valid123!";
      const password = await Password.create(plainPassword);
      const result = await password.compare(plainPassword);
      expect(result).toBe(true);
    });

    it("should return false for non-matching passwords", async () => {
      const password = await Password.create("Valid123!");
      const result = await password.compare("WrongPass1!");
      expect(result).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return hashed password with type of string", async () => {
      const password = await Password.create("Valid123!");
      const hashedPassword = password.toString();
      expect(typeof hashedPassword).toBe("string");
      expect(hashedPassword.length).toBeGreaterThan(0);
    });
  });
});
