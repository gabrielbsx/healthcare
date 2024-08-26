import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useLoadAuthUser from "@/presenter/hooks/use-load-auth-user";

interface PrivateRouteProps {
  component: ReactNode;
}

function PrivateRoute({ component: Component }: PrivateRouteProps) {
  const { userAuth } = useLoadAuthUser();

  if (!userAuth) {
    return <Navigate to="/login" />;
  }

  return Component;
}

export default PrivateRoute;
