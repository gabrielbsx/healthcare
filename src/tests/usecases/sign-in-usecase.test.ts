import { describe, it, expect, vi } from 'vitest';
import { StorageContract } from "@/application/contracts/storage.contract";
import { TokenContract } from "@/application/contracts/token.contract";
import {
  UserApiContract,
  UserAuthenticationResponse,
} from "@/application/contracts/user-api.contract";
import { SignInUseCase } from "@/application/usecases/sign-in.usecase";
import { UserEntityProps } from "@/domain/entities/user.entity";

describe("SignInUseCase", () => {
  const mockUserApi: UserApiContract = {
    authenticate: vi.fn(),
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  };

  const mockToken: TokenContract<Partial<UserEntityProps>> = {
    generateToken: vi.fn(),
    verifyToken: vi.fn(),
  };

  const mockStorage: StorageContract<string> = {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  };

  const signInUseCase = new SignInUseCase(mockUserApi, mockToken, mockStorage);

  it("should return a user with token on successful authentication", async () => {
    const mockUser = {
      id: "123",
      username: "testuser",
    };
    const mockTokenValue = "mocked-token";

    vi.mocked(mockUserApi.authenticate).mockResolvedValue(mockUser);
    vi.mocked(mockToken.generateToken).mockResolvedValue(mockTokenValue);

    const result = await signInUseCase.execute({
      username: "testuser",
      password: "password",
    });

    expect(mockUserApi.authenticate).toHaveBeenCalledWith({
      username: "testuser",
      password: "password",
    });
    expect(mockToken.generateToken).toHaveBeenCalledWith({
      id: "123",
      name: "testuser",
    });
    expect(mockStorage.set).toHaveBeenCalledWith("user-auth", mockTokenValue);

    expect(result).toEqual({
      id: "123",
      username: "testuser",
      token: mockTokenValue,
    });
  });

  it("should throw an error on invalid credentials", async () => {
    vi.mocked(mockUserApi.authenticate).mockResolvedValue(
      null as unknown as UserAuthenticationResponse
    );

    await expect(
      signInUseCase.execute({
        username: "testuser",
        password: "wrongpassword",
      })
    ).rejects.toThrow("Invalid credentials");
  });

  
});
