import type { ValidationErrorItem } from "./ValidationErrorItem.ts";

export class ValidationError extends Error {
  constructor(readonly errors: ValidationErrorItem[]) {
    super("Validation Fail");
  }
}
