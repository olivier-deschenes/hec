import { ID } from "@/types";
import { ProgramType } from "@/types/Program";

export type CourseType = {
  id: ID;
  code: string;
  prefix: string;
  title: string;
  done: boolean;
  program_id: ProgramType["id"];
};