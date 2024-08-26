import { SignInUseCase } from "@/application/usecases/sign-in.usecase";
import { LocalStorageImpl } from "@/infrastructure/storage/localstorage.impl";
import { UserStorageImpl } from "@/infrastructure/storage/user-storage.impl";
import { SimpleTokenImpl } from "@/infrastructure/token/simple-token.impl";

export const signInUseCaseFactory = () => {
  return new SignInUseCase(new UserStorageImpl(), new SimpleTokenImpl(), new LocalStorageImpl());
};
