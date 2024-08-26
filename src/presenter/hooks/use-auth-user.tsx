import { useContext } from "react";
import UserAuth from "@/presenter/contexts/user-auth-context";

function useAuthUser() {
  const { user } = useContext(UserAuth.Context);

  return { user };
}

export default useAuthUser;
