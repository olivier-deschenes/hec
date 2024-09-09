import { CourseForm } from "@/components/forms/CourseForm";
import { CoursesList } from "@/components/Program/CoursesList";
import { Program } from "@/components/Program/index";
import { programQueryOptions } from "@/components/queries/programs/useProgram";
import { createFileRoute } from "@tanstack/react-router";

function Component() {
  const data = Route.useLoaderData();

  return (
    <div>
      <h1>Program {data.id}</h1>
      <Program data={data} />
      <div>=========</div>
      <CoursesList program_id={data.id} />
      <div>=========</div>
      <CourseForm program_id={data.id} />
    </div>
  );
}

export const Route = createFileRoute("/programs/$programId")({
  component: Component,
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(programQueryOptions(params)),
});
