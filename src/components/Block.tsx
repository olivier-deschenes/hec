import { useCouseBlockContext } from "../contexts";
import type { CourseBlockType } from "../data/data";
import { Course } from "./Course";

const getCreditsInfomartion = (courseBlock: CourseBlockType) => {
  if ("credits" in courseBlock) {
    return `${courseBlock.credits} crédits`;
  }

  const parts = [];

  if ("minCredits" in courseBlock) {
    parts.push(`Min. ${courseBlock.minCredits} crédits`);
  }

  parts.push(`Max. ${courseBlock.maxCredits} crédits`);

  return `${parts.join(", ")}`;
};

export const Block = () => {
  const courseBlock = useCouseBlockContext().courseBlockType;
  const totalSelectedCredits = useCouseBlockContext().totalSelectedCredits;

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
        {courseBlock.classes.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </ul>
    </div>
  );
};
