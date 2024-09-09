import { useAuthContext } from "@/contexts";
import { router } from "@/lib/router";
import { RouterProvider } from "@tanstack/react-router";

export function App() {
  const authContext = useAuthContext();

  return <RouterProvider router={router} context={{ authContext }} />;
}
