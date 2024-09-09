import { Database } from "@/types/database.types";

export type ID = number;
export type UUID = string;
export type Timestamp = number;

type TablesType = Database["public"]["Tables"];

export type ProgramType = TablesType["program_v2"]["Row"];
export type CourseBlockType = TablesType["course_block"]["Row"];
export type CourseType = TablesType["course"]["Row"];
export type CourseBlockGroupType = TablesType["course_block_group"]["Row"];
