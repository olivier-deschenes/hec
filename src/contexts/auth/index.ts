import { Session } from "@supabase/supabase-js";
import { createContext } from "react";

export type AuthContextType = {
  user: Session | null;
  logout: () => void;
  login: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
