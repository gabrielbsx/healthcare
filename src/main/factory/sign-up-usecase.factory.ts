import { SignUpUseCase } from "@/application/usecases/sign-up.usecase";
import { UserStorageImpl } from "@/infrastructure/storage/user-storage.impl";

export const signUpUseCaseFactory = () => {
  return new SignUpUseCase(new UserStorageImpl());
};
