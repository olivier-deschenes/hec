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
      <div>
        <h1>Program {data.id}</h1>
        <div>
          <CourseBlockGroupForm program_id={data.id} />
        </div>
        <div>
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
