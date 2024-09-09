import { ProgramType } from "@/types/Program";
import { Link } from "@tanstack/react-router";

type ProgramProps = {
  data: ProgramType;
};

export function Program({ data }: ProgramProps) {
  return (
    <Link
      to={`/programs/${data.id}`}
      className={
        "flex p-5 m-5 bg-blue-300 h-5 w-5 justify-center items-center hover:bg-blue-600 cursor-pointer"
      }
    >
      {data.id}
    </Link>
  );
}
