import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useLoadAuthUser from "@/presenter/hooks/use-load-auth-user";
import SplashScreen from "@/presenter/components/splash-screen";

interface PrivateRouteProps {
  component: ReactNode;
}

function PrivateRoute({ component: Component }: PrivateRouteProps) {
  const { userAuth } = useLoadAuthUser();

  if (userAuth === undefined) {
    return <SplashScreen />;
  }

  if (userAuth === null) {
    return <Navigate to="/login" />;
  }

  return Component;
}

export default PrivateRoute;
