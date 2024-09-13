import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Import the generated route tree
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { App } from "@/App";
import { queryClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
          <Toaster richColors theme={"light"} closeButton />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
