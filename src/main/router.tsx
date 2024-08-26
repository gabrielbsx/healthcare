import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import SplashScreen from "@/presenter/components/splash-screen";

const router = createBrowserRouter(routes);

function Router() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default Router;
