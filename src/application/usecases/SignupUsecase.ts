import { User } from "@src/domain/entities/User.ts";
import type { UserRepository } from "@src/domain/repositories/UserRepositories.ts";
import { Username } from "@src/domain/value-object/Username.ts";
import { Email } from "@src/domain/value-object/Email.ts";
import { Password } from "@src/domain/value-object/Password.ts";

export interface SignupInput {
  username: string;
  email: string;
  password: string;
}

export interface FieldErrors {
  [field: string]: string[];
}

export class ValidationError extends Error {
  constructor(public errors: FieldErrors) {
    super(
      Object.entries(errors)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("; "),
    );
    this.name = "ValidationError";
  }
}

export class SignupUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: SignupInput): Promise<User> {
    const errors: FieldErrors = {};

    let username: Username | null = null;
    let email: Email | null = null;
    let password: Password | null = null;

    // Validate Username
    try {
      username = new Username(input.username);
    } catch (err: any) {
      errors.username = [err.message || "Invalid username."];
    }

    // Validate Email
    try {
      email = new Email(input.email);
    } catch (err: any) {
      errors.email = [err.message || "Invalid email."];
    }

    // Validate Password
    try {
      password = await Password.create(input.password);
    } catch (err: any) {
      errors.password = [err.message || "Invalid password."];
    }

    // Check for duplicates (only if no validation error for those fields)
    if (username) {
      const existingUser = await this.userRepository.findByUsername(username);
      if (existingUser) {
        errors.username = [
          ...(errors.username ?? []),
          "Username already exists.",
        ];
      }
    }

    if (email) {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        errors.email = [...(errors.email ?? []), "Email already exists."];
      }
    }

    // Throw if any validation or duplication errors
    if (Object.keys(errors).length > 0) {
      throw new ValidationError(errors);
    }

    if (!username || !email! || !password) {
      throw new Error("Unexpected null value for validate fields.");
    }

    const user = User.create(username, email, password);
    return await this.userRepository.save(user);
  }
}
