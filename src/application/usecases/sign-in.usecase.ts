import { UseCaseContract } from "@/domain/contracts/usecase.contract";
import { UserApiContract } from "../contracts/user-api.contract";

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
  constructor(private readonly _userApi: UserApiContract) {}

  async execute(data: SignInRequest): Promise<SignInResponse> {
    const { username, password } = data;

    const user = await this._userApi.authenticate({
      username,
      password,
    });

    return {
      ...user,
      token: "token",
    };
  }
}
