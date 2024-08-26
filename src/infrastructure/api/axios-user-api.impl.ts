import { UserEntityProps } from "@/domain/entities/user.entity";
import { AxiosApiImpl } from "./axios-api.impl";
import {
  UserApiContract,
  UserAuthenticationRequest,
  UserAuthenticationResponse,
} from "@/application/contracts/user-api.contract";

export class AxiosUserApiImpl
  extends AxiosApiImpl<UserEntityProps>
  implements UserApiContract
{
  constructor() {
    super("users");
  }

  async authenticate(
    data: UserAuthenticationRequest
  ): Promise<UserAuthenticationResponse> {
    const response = await this.api.post<UserAuthenticationResponse>(
      `/${this.entityName}`,
      data
    );

    return response.data;
  }
}
