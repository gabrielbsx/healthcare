import {
  BasePage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from "./pages";
import PrivateRoute from "./private-route";

export const routes = [
  {
    path: "/",
    element: <BasePage />,
    children: [
      {
        name: "Início",
        path: "/",
        isGuess: false,
        isPrivate: true,
        element: <PrivateRoute component={<HomePage />} />,
      },
      {
        name: "Entrar",
        path: "/login",
        isGuess: true,
        isPrivate: false,
        element: <LoginPage />,
      },
      {
        name: "Registrar",
        path: "/register",
        isGuess: true,
        isPrivate: false,
        element: <RegisterPage />,
      },
      {
        name: "Esqueceu a senha",
        path: "/forgot-password",
        isGuess: true,
        isPrivate: false,
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    path: "*",
    name: "Not Found",
    element: <NotFoundPage />,
  },
];

export const navbarRoutes = [
  ...(routes.find((route) => route.path === "/")?.children || []),
];
