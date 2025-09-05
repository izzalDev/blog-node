import type { UserRepository } from "@src/domain/repositories/UserRepositories.ts";
import { User } from "@src/domain/entities/User.ts";
import { Username } from "@src/domain/value-object/Username.ts";
import { Email } from "@src/domain/value-object/Email.ts";
import { SignupUsecase } from "@src/application/usecases/SignupUsecase.ts";
import { ValidationError } from "@src/shared/errors/ValidationError.ts";
import type { SignupDtos } from "@src/application/dtos/SignupDtos.ts";
import { ValueError } from "@src/shared/errors/ValueError.ts";

describe("SignupUsecase", () => {
  let mockUserRepository: jest.Mocked<UserRepository>;
  let usecase: SignupUsecase;

  beforeEach(() => {
    mockUserRepository = {
      findByUsername: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
    };
    usecase = new SignupUsecase(mockUserRepository);
  });

  const validInput: SignupDtos = {
    username: "valid_user",
    email: "valid@example.com",
    password: "Valid123!",
  };

  it("should create user successfully", async () => {
    mockUserRepository.findByUsername.mockResolvedValue(null);
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.save.mockImplementation(async (user) => user);

    const user = await usecase.execute(validInput);

    expect(user).toBeInstanceOf(User);
    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(
      expect.any(Username),
    );
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      expect.any(Email),
    );
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
  });

  it("should throw ValidationError if username is invalid", async () => {
    const input = { ...validInput, username: "a" }; // invalid username
    await expect(usecase.execute(input)).rejects.toThrow(ValueError);
  });

  it("should throw ValidationError if email is invalid", async () => {
    const input = { ...validInput, email: "invalid-email" };
    await expect(usecase.execute(input)).rejects.toThrow(ValueError);
  });

  it("should throw ValidationError if password is invalid", async () => {
    const input = { ...validInput, password: "123" };
    await expect(usecase.execute(input)).rejects.toThrow(ValueError);
  });

  it("should throw ValidationError if username already exists", async () => {
    mockUserRepository.findByUsername.mockResolvedValue({} as unknown as User);
    mockUserRepository.findByEmail.mockResolvedValue(null);
    await expect(usecase.execute(validInput)).rejects.toThrow(ValidationError);
    await expect(usecase.execute(validInput)).rejects.toMatchObject({
      errors: expect.arrayContaining([
        { field: "username", message: "Username already exists." },
      ]),
    });
  });

  it("should throw ValidationError if email already exists", async () => {
    mockUserRepository.findByUsername.mockResolvedValue(null);
    mockUserRepository.findByEmail.mockResolvedValue({} as unknown as User);
    await expect(usecase.execute(validInput)).rejects.toThrow(ValidationError);
    await expect(usecase.execute(validInput)).rejects.toMatchObject({
      errors: expect.arrayContaining([
        { field: "email", message: "Email already exists." },
      ]),
    });
  });
});
