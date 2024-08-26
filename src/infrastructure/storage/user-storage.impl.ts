import {
  UserApiContract,
  UserAuthenticationRequest,
  UserAuthenticationResponse,
} from "@/application/contracts/user-api.contract";
import { RepositoryLocalStorageImpl } from "./repository-localstorage.impl";
import { UserEntityProps } from "@/domain/entities/user.entity";

export class UserStorageImpl
  extends RepositoryLocalStorageImpl<UserEntityProps>
  implements UserApiContract
{
  async authenticate(
    data: UserAuthenticationRequest
  ): Promise<UserAuthenticationResponse> {
    const localStorageItem = localStorage.getItem("/users");

    const users = localStorageItem ? JSON.parse(localStorageItem) as UserEntityProps[] : [];

    const user = users.find((user) => user.name === data.username);

    if (user && user.password === data.password) {
      return {
        id: user.id,
        username: user.name,
      };
    }

    throw new Error("Invalid credentials");
  }
}
