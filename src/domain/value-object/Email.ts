import { ValueError } from "@src/shared/errors/ValueError";

export class Email {
  constructor(private readonly value: string) {
    if (!Email.isValid(value)) {
      throw new ValueError(`Invalid email address format: "${value}`);
    }
    this.value = value;
  }

  public static isValid(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }
}
