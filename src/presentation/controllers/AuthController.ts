import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/usecases/RegisterUser";

export class AuthController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  register = async (req: Request, res: Response): Promise<void> => {
    throw new Error("Not Implemented Yet");
  };
}
