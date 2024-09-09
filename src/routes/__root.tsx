import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { AuthContextType } from "@/contexts/AuthContext";
import { QueryClient } from "@tanstack/react-query";

type RootContextType = {
  authContext: AuthContextType;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContextType>()({
  component: () => (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  ),
});
