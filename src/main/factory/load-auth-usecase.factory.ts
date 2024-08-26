import { LocalStorageImpl } from "@/infrastructure/storage/localstorage.impl";
import { LoadAuthUserUseCase } from "@/application/usecases/load-auth-user.usecase";

export const loadAuthUserUseCaseFactory = () => {
  return new LoadAuthUserUseCase(new LocalStorageImpl());
};
