import type { FullCourseType } from "@/types";
import { useRef, useState } from "react";
import {
	useCourseBlockGroupContext,
	useCouseBlockContext,
	useProgramContext,
} from "../../contexts";

import type { BaseFormRefType } from "@/components/forms/base/type";
import { CourseForm } from "@/components/forms/course";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { toast } from "sonner";

type Props = {
	course: FullCourseType;
};

export const Course = ({ course }: Props) => {
	const ref = useRef<BaseFormRefType>(null);

	const program = useProgramContext();
	const optional = useCourseBlockGroupContext().courseBlockGroupType.optional;
	const toggleCourse = useCouseBlockContext().toggleCourse;

	const groupCanSelectMore = useCourseBlockGroupContext().canSelectMore;
	const blockCanSelectMore = useCouseBlockContext().canSelectMore;

	const canSelectMore = groupCanSelectMore && blockCanSelectMore;

	const isDone = course.done ?? false;
	const [checked, setChecked] = useState(isDone);

	const handleOnClick = () => {
		try {
			navigator.clipboard.writeText(`${course.prefix} ${course.code}`);
			toast.message(
				<p>
					Copied course{" "}
					<span className={"font-bold"}>
						{course.prefix} {course.code}
					</span>{" "}
					to clipboard
				</p>,
			);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<li className={cn("mx-1.5 px-1.5 h-full flex items-centers gap-1.5")}>
			<CourseForm
				program_id={program.id}
				defaultData={course}
				course_block_id={course.course_block_id}
				dialogRef={ref}
			/>
			<div className={"flex self-start gap-1.5 items-center"}>
				<a
					href={program.resolveClassUrl(course)}
					className={
						"text-blue-500 hover:underline font-mono h-full flex items-center"
					}
					target={"_blank"}
					rel="noreferrer"
				>
					<ExternalLinkIcon className={"h-4 w-4"} />
				</a>
				{optional && (
					<input
						type="checkbox"
						name=""
						id=""
						checked={checked}
						disabled={(!canSelectMore && !checked) || isDone}
						onChange={() => {
							setChecked((prev) => !prev);
							toggleCourse(course);
						}}
					/>
				)}
				<TooltipProvider>
					<Tooltip delayDuration={300}>
						<TooltipTrigger asChild>
							<button
								type="button"
								className={"hover:bg-slate-100 rounded-md px-1.5"}
								onClick={handleOnClick}
							>
								<span className={"text-nowrap font-mono"}>
									{course.prefix} {course.code}
								</span>
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Copy to clipboard</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<button
				className={
					"text-ellipsis overflow-hidden text-left hover:bg-slate-50 rounded-md px-1.5"
				}
				type={"button"}
				onClick={() => ref.current?.open()}
			>
				{course.title}
			</button>
		</li>
	);
};
