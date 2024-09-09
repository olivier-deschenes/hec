import { Button } from "@/components/ui/button";
import { router } from "@/lib/router";
import { supabase } from "@/lib/supabase";
import { usePostProgram } from "@/mutations/usePostProgram";
import { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useMemo, useState } from "react";

export type AuthContextType = {
  user: Session | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

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

  const { mutate } = usePostProgram();

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

  const value: AuthContextType = useMemo(
    () => ({
      user: session,
    }),
    [session]
  );

  if (loading) return "🐸🐸🐸🐸";

  return (
    <AuthContext.Provider value={value}>
      <div>
        <h1>
          {JSON.stringify({
            email: session?.user.email,
          })}
        </h1>
        <Button
          onClick={() => {
            mutate({});
          }}
        >
          Add Program
        </Button>
        <Button onClick={login}>Login</Button>
        <Button onClick={logout}>Logout</Button>
      </div>
      {children}
    </AuthContext.Provider>
  );
};