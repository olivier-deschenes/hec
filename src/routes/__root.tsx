import type { AuthContextType } from "@/contexts/auth";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import * as React from "react";

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
