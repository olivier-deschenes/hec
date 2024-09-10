import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

function Component() {
  return (
    <div className={"flex flex-col gap-5"}>
      <div>
        <Button asChild>
          <Link to="/programs">Programs</Link>
        </Button>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Component,
  beforeLoad({ context: { authContext } }) {
    console.log(authContext);
  },
});
