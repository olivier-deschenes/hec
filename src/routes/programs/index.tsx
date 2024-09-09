import { Program } from "@/components/Program/index";
import { usePrograms } from "@/components/queries/programs/usePrograms";
import { createFileRoute } from "@tanstack/react-router";

function Component() {
  const { data, status } = usePrograms();

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>Programs</h1>
      {status === "pending" ? "Loading..." : null}
      {data?.map((program) => <Program data={program} key={program.id} />)}
    </div>
  );
}

export const Route = createFileRoute("/programs/")({
  component: Component,
});
