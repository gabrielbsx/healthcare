import { lazy } from "react";

export const BasePage = lazy(() => import("@/presenter/components/page"));
export const HomePage = lazy(() => import("@/presenter/pages/home"));
export const NotFoundPage = lazy(() => import("@/presenter/pages/not-found"));

export const LoginPage = lazy(() => import("@/presenter/pages/auth/login"));
export const RegisterPage = lazy(() => import("@/presenter/pages/auth/register"));
export const ForgotPasswordPage = lazy(() => import("@/presenter/pages/auth/forgot-password"));