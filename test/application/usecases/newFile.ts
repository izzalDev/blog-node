import { SignupUsecase, type SignupInput } from "@src/application/usecases/SignupUsecase.ts";
import type { User } from "@src/domain/entities/User.ts";
import type { UserRepository } from "@src/domain/repositories/UserRepositories.ts";
import { Email } from "@src/domain/value-object/Email.ts";
import { Username } from "@src/domain/value-object/Username.ts";

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

    const validInput: SignupInput = {
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
            expect.any(Username)
        );
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
            expect.any(Email)
        );
        expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });

    it("should throw ValidationError if username is invalid", async () => {
        const input = { ...validInput, username: "a" }; // invalid username

        await expect(usecase.execute(input)).rejects.toThrow(ValidationError);
        await expect(usecase.execute(input)).rejects.toMatchObject({
            errors: {
                username: expect.any(Array),
            },
        });
    });

    it("should throw ValidationError if email is invalid", async () => {
        const input = { ...validInput, email: "invalid-email" };

        await expect(usecase.execute(input)).rejects.toThrow(ValidationError);
        await expect(usecase.execute(input)).rejects.toMatchObject({
            errors: {
                email: expect.any(Array),
            },
        });
    });

    it("should throw ValidationError if password is invalid", async () => {
        const input = { ...validInput, password: "123" };

        await expect(usecase.execute(input)).rejects.toThrow(ValidationError);
        await expect(usecase.execute(input)).rejects.toMatchObject({
            errors: {
                password: expect.any(Array),
            },
        });
    });

    it("should throw ValidationError if username already exists", async () => {
        mockUserRepository.findByUsername.mockResolvedValue({} as unknown as User);
        mockUserRepository.findByEmail.mockResolvedValue(null);

        await expect(usecase.execute(validInput)).rejects.toThrow(ValidationError);
        await expect(usecase.execute(validInput)).rejects.toMatchObject({
            errors: {
                username: expect.arrayContaining(["Username already exists."]),
            },
        });
    });

    it("should throw ValidationError if email already exists", async () => {
        mockUserRepository.findByUsername.mockResolvedValue(null);
        mockUserRepository.findByEmail.mockResolvedValue({} as unknown as User);

        await expect(usecase.execute(validInput)).rejects.toThrow(ValidationError);
        await expect(usecase.execute(validInput)).rejects.toMatchObject({
            errors: {
                email: expect.arrayContaining(["Email already exists."]),
            },
        });
    });

    it("should accumulate multiple errors", async () => {
        mockUserRepository.findByUsername.mockResolvedValue({} as unknown as User);
        mockUserRepository.findByEmail.mockResolvedValue({} as unknown as User);

        const input = { username: "a", email: "bademail", password: "123" };

        await expect(usecase.execute(input)).rejects.toThrow(ValidationError);
        await expect(usecase.execute(input)).rejects.toMatchObject({
            errors: {
                username: expect.any(Array),
                email: expect.any(Array),
                password: expect.any(Array),
            },
        });
    });
});
