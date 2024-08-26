import { UserEntityProps } from "@/domain/entities/user.entity";
import { loadAuthUserUseCaseFactory } from "@/main/factory/load-auth-usecase.factory";
import { useEffect, useState } from "react";

function useLoadAuthUser() {
  const [userAuth, setUserAuth] = useState<UserEntityProps | null>();

  async function fetchUserAuth() {
    const loadAuthUserUseCase = loadAuthUserUseCaseFactory();

    const user = await loadAuthUserUseCase.execute();

    setUserAuth(user || null);
  }

  useEffect(() => {
    fetchUserAuth();
  }, []);

  return { userAuth };
}

export default useLoadAuthUser;
