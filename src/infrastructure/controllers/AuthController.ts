import type { SignupUsecase } from "@usecases/SignupUsecase";
import { Email } from "@value-object/Email";
import { Username } from "@value-object/Username";
import { Password } from "@value-object/Password";
import type { ValidationErrorItem } from "@errors/ValidationErrorItem";
import { ValidationError } from "@errors/ValidationError";
import type { Request, Response } from "express";

export class AuthController {
  constructor(private readonly signupUsecase: SignupUsecase) {}

  async signup(req: Request, res: Response) {
    const errors: ValidationErrorItem[] = [];

    const { email, username, password, passwordConfirm } = req.body;

    if (!Email.isValid(email)) {
      errors.push({ field: "email", message: "Email format is invalid" });
    }

    if (!Username.isValid(username)) {
      errors.push({ field: "username", message: "Invalid username format" });
    }

    if (!Password.isValid(password)) {
      errors.push({
        field: "password",
        message: "Password must be at least 8 characters, an",
      });
    }

    if (password !== passwordConfirm) {
      errors.push({
        field: "passwordConfirm",
        message: "Password beda",
      });
    }

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    const result = await this.signupUsecase.execute({
      email,
      username,
      password,
    });

    res.status(201).json({ status: "success", data: result.toJson() });
  }
}
