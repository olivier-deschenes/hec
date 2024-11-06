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

  const isStarted = course.started ?? false;
  const isDone = course.done ?? false;

  const [checked, setChecked] = useState(isDone || isStarted);

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
        (checked || isDone || isStarted) && "rounded-md",
        isDone && "bg-gray-200",
        isStarted && "bg-blue-200",
        checked && !isDone && !isStarted && "bg-blue-200"
      )}
    >
      <div className={"flex self-start gap-1.5 items-center"}>
        {optional && (
          <input
            type="checkbox"
            name=""
            id=""
            checked={checked}
            disabled={(!canSelectMore && !checked) || isDone || isStarted}
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
        {course.trimester ? (
          <div className={"flex items-center"}>
            <span
              className={twMerge(
                "rounded-md leading-snug text-xs px-1 text-white",
                course.done && "bg-gray-600",
                course.started && "bg-blue-600"
              )}
            >
              {course.trimester}
            </span>
          </div>
        ) : null}
      </div>

      <span className={"text-ellipsis overflow-hidden"}>{course.title}</span>
    </li>
  );
};
