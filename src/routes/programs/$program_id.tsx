import { CourseBlockGroupForm } from "@/components/forms/CourseBlockGroupForm";
import { Group } from "@/components/test/Group";
import { useFullProgram } from "@/components/queries/useFullData";
import { CourseBlockGroupProvider } from "@/contexts/CourseBlockGroupContext";
import { ProgramProvider } from "@/contexts/ProgramContext";
import { createFileRoute } from "@tanstack/react-router";

function Component() {
  const { program_id } = Route.useParams();

  const { data, status } = useFullProgram({ program_id: Number(program_id) });

  if (status === "error") {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>Error</div>;
  }

  return (
    <ProgramProvider program={data}>
      <div className={"p-5 flex flex-col gap-5"}>
        <div>
          <h1 className={"text-3xl font-bold"}>{data.title}</h1>
          <div>
            <div>
              <span className={"font-bold"}>Cours:</span> {data.courseCount}{" "}
              cours <span>{`(${data.courseCredits} crédits)`}</span>
            </div>
            <div>
              <span className={"font-bold"}>Total Crédits : </span>{" "}
              {data.totalCredits} crédits
            </div>
          </div>
        </div>
        <div>
          <CourseBlockGroupForm program_id={data.id} />
        </div>
        <div className={"flex flex-col gap-10"}>
          {data.courseBlockGroups.map((courseBlockGroup) => (
            <CourseBlockGroupProvider
              courseBlockGroupType={courseBlockGroup}
              key={courseBlockGroup.id}
            >
              <Group />
            </CourseBlockGroupProvider>
          ))}
        </div>
      </div>
    </ProgramProvider>
  );
}

export const Route = createFileRoute("/programs/$program_id")({
  component: Component,
});
