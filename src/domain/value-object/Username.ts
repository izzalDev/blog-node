import { ValueError } from "@src/shared/errors/ValueError.ts";

export class Username {
  constructor(private readonly value: string) {
    if (!Username.isValid(value)) {
      throw new ValueError(
        "Invalid username: must be at least 2 characters and only contain letters, numbers, or underscores.",
      );
    }
    this.value = value;
  }

  static isValid(username: string) {
    const usernameRegex = /^\w{2,}$/;
    return usernameRegex.test(username);
  }

  toString(): string {
    return this.value;
  }
}
