import { UserRepository } from "../../domain/repositories/UserRepository";
import { AuthService } from "../../domain/services/AuthService";
import {
  CreateUserRequest,
  User,
  CreateUser,
} from "../../domain/entities/User";
import { ValidationError } from "../../domain/entities/ValidationError";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(request: CreateUserRequest): Promise<User | null> {
    this.validateInput(request);
    this.confirmPassword(request.password, request.passwordConfirm);
    await this.checkIfUsernameExists(request.username);
    await this.checkIfEmailExists(request.email);
    const hashedPassword = await this.hashPassword(request.password);
    const newUser = await this.createUser(request, hashedPassword);
    return newUser;
  }

  private validateInput(request: CreateUserRequest): void {
    if (!request.email || !request.password || !request.username) {
      throw new ValidationError("Email, password, and username are required.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.email)) {
      throw new ValidationError("Invalid email format.");
    }
  }

  private confirmPassword(password: string, passwordConfirm: string) {
    if (password != passwordConfirm) {
      throw new ValidationError("Invalid Password Confirm");
    }
  }

  private async checkIfUsernameExists(username: string): Promise<void> {
    const user = await this.userRepository.findByUsername(username);
    if (user) {
      throw new ValidationError("Username already taken.");
    }
  }

  private async checkIfEmailExists(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new ValidationError("Email already registered.");
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return this.authService.hashPassword(password);
  }

  private async createUser(
    request: CreateUserRequest,
    hashedPassword: string
  ): Promise<User> {
    const userToCreate: CreateUser = {
      email: request.email,
      username: request.username,
      passwordHash: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: request.name || "",
    };

    const createdUser: User = await this.userRepository.create(userToCreate);
    return createdUser;
  }
}
