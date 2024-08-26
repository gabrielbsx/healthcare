import { describe, it, expect, vi } from "vitest";
import { SignUpUseCase } from "@/application/usecases/sign-up.usecase";
import { UserApiContract } from "@/application/contracts/user-api.contract";

describe("SignUpUseCase", () => {
  const mockUserApi: UserApiContract = {
    authenticate: vi.fn(),
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  };

  const signUpUseCase = new SignUpUseCase(mockUserApi);

  it("should create a new user and return the user ID", async () => {
    const mockUser = { id: "123" };

    vi.mocked(mockUserApi.post).mockResolvedValue({
      id: mockUser.id,
      name: "newuser",
      gender: "male",
      dateOfBirth: new Date(),
      email: "",
      password: "password123",
    });

    const result = await signUpUseCase.execute({
      username: "newuser",
      password: "password123",
      passwordConfirmation: "password123",
    });

    expect(mockUserApi.post).toHaveBeenCalledWith("/users", {
      name: "newuser",
      password: "password123",
      gender: "male",
      dateOfBirth: expect.any(Date),
      email: "",
    });

    expect(result).toEqual({ id: "123" });
  });
});
