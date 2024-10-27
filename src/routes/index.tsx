import { createFileRoute } from "@tanstack/react-router";
import { Program } from "../components/Program";
import { OperationsManagementAndLogistics } from "../data/data";

function Component() {
  return (
    <div className={"flex flex-col gap-5"}>
      <Program program={OperationsManagementAndLogistics} />
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Component,
});
