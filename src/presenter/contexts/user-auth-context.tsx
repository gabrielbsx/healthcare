import { createContext, ReactNode, useEffect, useState } from "react";
import { UserEntityProps } from "@/domain/entities/user.entity";
import useLoadAuthUser from "@/presenter/hooks/use-load-auth-user";

type UserContext = {
  user: UserEntityProps | null;
  setUser: (user: UserEntityProps | null) => void;
};

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});

function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserEntityProps | null>(null);

  const { userAuth } = useLoadAuthUser();

  useEffect(() => {
    if (userAuth) {
      setUser(userAuth);
    }
  }, [userAuth]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

const UserAuth = {
  Provider: UserAuthProvider,
  Consumer: UserContext.Consumer,
  Context: UserContext,
};

export default UserAuth;
