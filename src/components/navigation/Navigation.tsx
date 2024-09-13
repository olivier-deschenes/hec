import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Navigation = () => {
  return (
    <div className={"flex flex-col gap-5"}>
      <div>
        <Button asChild>
          <Link to="/programs">Programs</Link>
        </Button>
      </div>
      <div>
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
      </div>
    </div>
  );
};
