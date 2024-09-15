import { AuthContext, type AuthContextType } from "@/contexts/auth";
import { router } from "@/lib/router";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState } from "react";

/* const login = async () => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: "olivierdeschenes9@gmail.com",
		password: "1234567@",
	});

	console.log(data, error);
}; */

const signInWithLinkedIn = async () => {
	console.log(import.meta.env.VITE_SUPABASE_REDIRECT_URL);
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "linkedin_oidc",
		options: {
			redirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL!,
		},
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

	const logout = useCallback(async () => {
		const { error } = await supabase.auth.signOut();

		console.log(error);

		await router.invalidate();
	}, []);

	const value = useMemo<AuthContextType>(
		() => ({
			session,
			logout,
			signInWithLinkedIn,
		}),
		[session, logout],
	);

	if (loading) return "🐸🐸🐸🐸";

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
