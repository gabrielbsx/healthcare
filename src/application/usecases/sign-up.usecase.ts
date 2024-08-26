import { UseCaseContract } from "@/domain/contracts/usecase.contract";
import { UserApiContract } from "../contracts/user-api.contract";

export interface SignUpRequest {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpResponse {
  id: string;
}

export class SignUpUseCase
  implements UseCaseContract<SignUpRequest, SignUpResponse>
{
  constructor(private readonly _userApi: UserApiContract) {}

  async execute(data: SignUpRequest): Promise<SignUpResponse> {
    const { username, password } = data;

    console.log(data);

    const user = await this._userApi.post("/users", {
      name: username,
      password,
      gender: "male",
      dateOfBirth: new Date(),
      email: "",
    });

    return {
      id: user.id,
    };
  }
}
