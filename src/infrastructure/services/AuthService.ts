import { AuthService } from "../../domain/services/AuthService";

export class AuthServiceImpl implements AuthService {
  hashPassword(password: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  comparePassword(password: string, hash: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  generateToken(userId: string): string {
    throw new Error("Method not implemented.");
  }
  verifyToken(token: string): { userId: string } | null {
    throw new Error("Method not implemented.");
  }
}
