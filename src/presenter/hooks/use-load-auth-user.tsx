import { UserEntityProps } from "@/domain/entities/user.entity";
import { loadAuthUserUseCaseFactory } from "@/main/factory/load-auth-usecase.factory";
import { useEffect, useState } from "react";

function useLoadAuthUser() {
  const [userAuth, setUserAuth] = useState<UserEntityProps | null>(null);

  async function fetchUserAuth() {
    const loadAuthUserUseCase = loadAuthUserUseCaseFactory();

    const user = await loadAuthUserUseCase.execute();

    setUserAuth(user);
  }

  useEffect(() => {
    fetchUserAuth();
  }, []);

  return { userAuth };
}

export default useLoadAuthUser;
