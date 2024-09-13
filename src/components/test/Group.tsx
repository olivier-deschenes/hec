import { CourseBlockForm } from "@/components/forms/course-block";
import { useCourseBlockGroupContext, useProgramContext } from "../../contexts";
import { CourseBlockProvider } from "../../contexts/CourseBlockContext";
import { Block } from "./Block";
import { useDeleteCourseBlockGroup } from "@/mutations/course-block-group/useDeleteCourseBlockGroup";
import { DeleteButton } from "@/components/forms/buttons/DeleteButton";
import { BaseFormRefType } from "@/components/forms/base/type";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export const Group = () => {
  const courseBlockGroup = useCourseBlockGroupContext().courseBlockGroupType;
  const totalSelectedCredits =
    useCourseBlockGroupContext().totalSelectedCredits;
  const optional = useCourseBlockGroupContext().courseBlockGroupType.optional;

  const program_id = useProgramContext().id;

  const { mutate, isPending } = useDeleteCourseBlockGroup();
  const ref = useRef<BaseFormRefType>(null);

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
          <DeleteButton
            onClick={() => mutate(courseBlockGroup.id)}
            isPending={isPending}
          >
            Delete Group
          </DeleteButton>
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
        <Button
          onClick={() => {
            ref.current?.open();
          }}
          variant={"outline"}
        >
          Create Course Block
        </Button>
        <CourseBlockForm
          course_block_group_id={courseBlockGroup.id}
          program_id={program_id}
          dialogRef={ref}
        />
      </div>
    </div>
  );
};
