import type { Session as SessionType } from "@supabase/supabase-js";
import { createContext } from "react";

export type AuthContextType = {
  session: SessionType | null;
  logout: () => void;
  signInWithLinkedIn: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
