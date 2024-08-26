import { StorageContract } from "@/application/contracts/storage.contract";
import { UseCaseContract } from "@/domain/contracts/usecase.contract";
import { UserEntityProps } from "@/domain/entities/user.entity";

export class LoadAuthUserUseCase
  implements UseCaseContract<void, UserEntityProps>
{
  constructor(private readonly _storage: StorageContract<UserEntityProps>) {}

  async execute(): Promise<UserEntityProps> {
    const user = this._storage.get("user-auth");

    return user as UserEntityProps;
  }
}
