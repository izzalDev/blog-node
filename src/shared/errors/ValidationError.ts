import type { ValidationErrorItem } from "./ValidationErrorItem";

export class ValidationError extends Error {
  constructor(readonly errors: ValidationErrorItem[]) {
    super("Validation Fail");
  }
}
