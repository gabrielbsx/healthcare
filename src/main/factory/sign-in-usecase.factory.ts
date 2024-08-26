import { SignInUseCase } from "@/application/usecases/sign-in.usecase";
import { AxiosUserApiImpl } from "@/infrastructure/api/axios-user-api.impl";

export const signInUseCaseFactory = () => {
  return new SignInUseCase(new AxiosUserApiImpl());
};
