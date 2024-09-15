import type { ProgramType } from "@/types";
import { Link } from "@tanstack/react-router";

type ProgramProps = {
	data: ProgramType;
};

export function Program({ data }: ProgramProps) {
	return (
		<Link
			to={`/programs/${data.id}`}
			className={
				"flex p-5 m-5 bg-blue-300 justify-center items-center hover:bg-blue-600 cursor-pointer"
			}
		>
			{data.title}
		</Link>
	);
}
