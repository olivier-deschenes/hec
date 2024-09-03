import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  useCourseBlockGroupContext,
  useCouseBlockContext,
  useProgramContext,
} from "../contexts";
import type { CourseType } from "../data/data";

type Props = {
  course: CourseType;
};

export const Course = ({ course }: Props) => {
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
    <li
      className={twMerge(
        "mx-1.5 px-1.5 flex items-center gap-1.5 h-full",
        (checked || isDone) && "rounded-md",
        isDone && "bg-green-200",
        checked && !isDone && "bg-blue-200",
      )}
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
      <span className={"text-ellipsis overflow-hidden"}>{course.title}</span>
    </li>
  );
};
