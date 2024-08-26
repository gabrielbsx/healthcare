import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./main/router";
import UserAuth from "./presenter/contexts/user-auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/presenter/assets/css/globals.css";
import { Toaster } from "./presenter/components/ui/toaster";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserAuth.Provider>
        <Router />
      </UserAuth.Provider>
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
