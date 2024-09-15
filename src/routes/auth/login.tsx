import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from "@/contexts";
import { createFileRoute } from "@tanstack/react-router";

function Component() {
	const { signInWithLinkedIn } = useAuthContext();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
			</CardHeader>
			<CardContent>
				<Button
					variant={"outline"}
					onClick={signInWithLinkedIn}
					className={"flex items-center gap-1 px-2.5 py-1.5 rounded-md"}
				>
					<img
						src={"/logo/LI-In-Bug.png"}
						alt={"LinkedIn logo"}
						className={"w-5"}
					/>
					Sign in with LinkedIn
				</Button>
			</CardContent>
		</Card>
	);
}

export const Route = createFileRoute("/auth/login")({
	component: Component,
});
