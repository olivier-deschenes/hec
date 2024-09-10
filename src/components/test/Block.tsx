import { FullCourseBlockType } from "@/types";
import { useCouseBlockContext, useProgramContext } from "../../contexts";
import { Course } from "./Course";
import { CourseForm } from "@/components/forms/CourseForm";

const getCreditsInfomartion = (courseBlock: FullCourseBlockType) => {
  if (courseBlock.credits !== null) {
    return `${courseBlock.credits} crédits`;
  }

  const parts = [];

  if ("minimum_credits" in courseBlock) {
    parts.push(`Min. ${courseBlock.minimum_credits} crédits`);
  }

  parts.push(`Max. ${courseBlock.maximum_credits} crédits`);

  return `${parts.join(", ")}`;
};

export const Block = () => {
  const courseBlock = useCouseBlockContext().courseBlockType;
  const totalSelectedCredits = useCouseBlockContext().totalSelectedCredits;
  const program_id = useProgramContext().id;

  const canSelect = !("credits" in courseBlock);

  return (
    <div className={"flex flex-col"}>
      <div
        className={"bg-[#0169BF] flex justify-between p-2.5 gap-1 rounded-t-md"}
      >
        <h3 className={"font-bold text-white"}>{courseBlock.title}</h3>
        <div className={"flex gap-2.5"}>
          {canSelect && (
            <div className={"bg-blue-200 rounded-md px-2.5"}>
              {`${totalSelectedCredits} crédits sél.`}
            </div>
          )}
          <div className={"bg-slate-300 rounded-md px-2.5"}>
            {getCreditsInfomartion(courseBlock)}
          </div>
        </div>
      </div>
      <ul
        className={"flex flex-col py-1.5 gap-1 border-b border-x rounded-b-md"}
      >
        {courseBlock.courses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
        <li>
          <CourseForm
            program_id={program_id}
            course_block_id={courseBlock.id}
          />
        </li>
      </ul>
    </div>
  );
};
