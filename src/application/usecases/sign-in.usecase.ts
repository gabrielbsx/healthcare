import { UseCaseContract } from "@/domain/contracts/usecase.contract";
import { UserApiContract } from "../contracts/user-api.contract";
import { TokenContract } from "../contracts/token.contract";
import { UserEntityProps } from "@/domain/entities/user.entity";
import { StorageContract } from "../contracts/storage.contract";

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  id: string;
  username: string;
  token: string;
}

export class SignInUseCase
  implements UseCaseContract<SignInRequest, SignInResponse>
{
  constructor(
    private readonly _userApi: UserApiContract,
    private readonly _token: TokenContract<Partial<UserEntityProps>>,
    private readonly _userAuthStorage: StorageContract<string>
  ) {}

  async execute(data: SignInRequest): Promise<SignInResponse> {
    const { username, password } = data;

    const user = await this._userApi.authenticate({
      username,
      password,
    });

    if (user) {
      const token = await this._token.generateToken({
        id: user.id,
        name: user.username,
      });

      this._userAuthStorage.set("user-auth", token);

      return {
        ...user,
        token,
      };
    }

    throw new Error("Invalid credentials");
  }
}
