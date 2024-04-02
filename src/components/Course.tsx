import { useState } from "react";
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

  const [checked, setChecked] = useState(false);

  return (
    <li>
      {optional && (
        <input
          type="checkbox"
          name=""
          id=""
          className={"mr-2.5"}
          disabled={!canSelectMore && !checked}
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
      >
        {course.prefix} {course.code}
      </a>{" "}
      - {course.title}
    </li>
  );
};
