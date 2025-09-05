import { User } from "@src/domain/entities/User.ts";
import type { UserRepository } from "@src/domain/repositories/UserRepositories.ts";
import { Username } from "@src/domain/value-object/Username.ts";
import { Email } from "@src/domain/value-object/Email.ts";
import { Password } from "@src/domain/value-object/Password.ts";
import type { ValidationErrorItem } from "@src/shared/errors/ValidationErrorItem.ts";
import { ValidationError } from "@src/shared/errors/ValidationError.ts";
import type { SignupDtos as SignupDto } from "../dtos/SignupDtos.ts";

export class SignupUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: SignupDto): Promise<User> {
    const errors: ValidationErrorItem[] = [];

    const [existingEmail, existingUsername] = await Promise.all([
      this.userRepository.findByEmail(new Email(input.email)),
      this.userRepository.findByUsername(new Username(input.username)),
    ]);

    if (existingEmail) {
      errors.push({ field: "email", message: "Email already exists." });
    }

    if (existingUsername) {
      errors.push({ field: "username", message: "Username already exists." });
    }

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    const user = User.create(
      new Username(input.username),
      new Email(input.email),
      await Password.create(input.password),
    );

    return await this.userRepository.save(user);
  }
}
