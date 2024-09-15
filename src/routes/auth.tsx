import { Outlet, createFileRoute } from "@tanstack/react-router";

function Component() {
	return (
		<div className={"flex w-screen h-screen justify-center items-center"}>
			<Outlet />
		</div>
	);
}

export const Route = createFileRoute("/auth")({
	component: Component,
});
