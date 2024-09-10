import { CourseBlockForm } from "@/components/forms/CourseBlockForm";
import { useCourseBlockGroupContext, useProgramContext } from "../../contexts";
import { CourseBlockProvider } from "../../contexts/CourseBlockContext";
import { Block } from "./Block";

export const Group = () => {
  const courseBlockGroup = useCourseBlockGroupContext().courseBlockGroupType;
  const totalSelectedCredits =
    useCourseBlockGroupContext().totalSelectedCredits;
  const optional = useCourseBlockGroupContext().courseBlockGroupType.optional;

  const program_id = useProgramContext().id;

  return (
    <div className={"flex flex-col gap-1"}>
      <h2 className={"flex gap-5 items-center"}>
        <div className={"font-bold text-xl"}>{courseBlockGroup.title}</div>
        <div className={"flex gap-2.5"}>
          {optional && (
            <div className={"bg-blue-200 rounded-md px-2.5"}>
              {`${totalSelectedCredits} crédits sél.`}
            </div>
          )}
          <div className={"bg-slate-300 rounded-md px-2.5"}>
            {courseBlockGroup.credits} crédits
          </div>
        </div>
      </h2>
      <div
        className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start"
        }
      >
        {courseBlockGroup.courseBlocks.map((courseBlock) => (
          <CourseBlockProvider
            key={courseBlock.id}
            courseBlockType={courseBlock}
          >
            <Block />
          </CourseBlockProvider>
        ))}
      </div>
      <div>
        <CourseBlockForm
          course_block_group_id={courseBlockGroup.id}
          program_id={program_id}
        />
      </div>
    </div>
  );
};
