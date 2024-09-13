import { AuthContextType, AuthContext } from "@/contexts/auth";
import { router } from "@/lib/router";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "olivierdeschenes9@gmail.com",
    password: "1234567@",
  });

  console.log(data, error);
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
      } else {
        setSession(data.session);
      }

      setLoading(false);
    };

    handleAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    console.log(error);

    await router.invalidate();
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user: session,
      logout,
      login,
    }),
    [session]
  );

  if (loading) return "🐸🐸🐸🐸";

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
