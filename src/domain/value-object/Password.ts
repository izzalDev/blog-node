import { compare, hash } from "bcrypt";
import { ValueError } from "../error/ValueError.ts";

export class Password {
  private static readonly SALT_ROUNDS = 10;

  private constructor(private readonly hashedValue: string) {}

  public static async create(plainTextPassword: string) {
    if (!Password.isValid(plainTextPassword)) {
      throw new ValueError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special characters",
      );
    }
    const hashedPassword = await hash(plainTextPassword, Password.SALT_ROUNDS);
    return new Password(hashedPassword);
  }

  public static isValid(plainTextPassword: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    return passwordRegex.test(plainTextPassword);
  }

  public async compare(plainTextPassword: string): Promise<boolean> {
    return compare(plainTextPassword, this.hashedValue);
  }

  toString(): string {
    return this.hashedValue;
  }
}
