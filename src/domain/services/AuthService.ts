export interface AuthService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateToken(userId: string): string;
  verifyToken(token: string): { userId: string } | null;
}
