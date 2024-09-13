import type { FullCourseType } from "@/types";
import { useRef, useState } from "react";
import {
	useCourseBlockGroupContext,
	useCouseBlockContext,
	useProgramContext,
} from "../../contexts";

import type { BaseFormRefType } from "@/components/forms/base/type";
import { CourseForm } from "@/components/forms/course";
import { cn } from "@/lib/utils";

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
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<li className={"flex flex-col"}>
			<CourseForm
				program_id={program.id}
				defaultData={course}
				course_block_id={course.course_block_id}
				dialogRef={ref}
			/>
			<button
				className={cn(
					"mx-1.5 px-1.5 h-full flex items-centers gap-1.5 hover:bg-slate-100",
					(checked || isDone) && "rounded-md",
					isDone && "bg-green-200 hover:bg-green-300",
					checked && !isDone && "bg-blue-200",
				)}
				onClick={() => ref.current?.open()}
				type="button"
			>
				<div className={"flex self-start gap-1.5 items-center"}>
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
					<a
						href={program.resolveClassUrl(course)}
						className={"text-blue-500 hover:underline font-mono"}
						target={"_blank"}
						rel="noreferrer"
						onClick={(e) => {
							if (e.ctrlKey || e.metaKey) {
								e.preventDefault();
								handleOnClick();
							}
						}}
					>
						<span className={"text-nowrap"}>
							{course.prefix} {course.code}
						</span>
					</a>
				</div>
				<span className={"text-ellipsis overflow-hidden text-left"}>
					{course.title}
				</span>
			</button>
		</li>
	);
};
