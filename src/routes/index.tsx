import { Navigation } from "@/components/navigation/Navigation";
import { createFileRoute } from "@tanstack/react-router";

function Component() {
	return (
		<div className={"flex flex-col gap-5"}>
			<Navigation />
			<header className={"flex flex-col gap-1.5"}>
				<h1 className={"text-9xl"}>Semestri</h1>
				<h3 className={"text-3xl"}>
					Managing your courses, <span className={"italic"}>without</span> the
					hassle
				</h3>
			</header>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: Component,
});
