import { UserEntityProps } from "@/domain/entities/user.entity";
import { ApiContract } from "./api.contract";

export interface UserAuthenticationRequest {
  username: string;
  password: string;
}

export interface UserAuthenticationResponse {
  id: string;
  username: string;
}

export interface UserApiContract extends ApiContract<UserEntityProps> {
  authenticate(data: UserAuthenticationRequest): Promise<UserAuthenticationResponse>;
}
