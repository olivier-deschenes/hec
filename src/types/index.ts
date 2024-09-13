import type { Database } from "@/types/database.types";

export type ID = number;
export type UUID = string;
export type Timestamp = number;

type TablesType = Database["public"]["Tables"];

export type ProgramType = TablesType["program"]["Row"];
export type CourseBlockType = TablesType["course_block"]["Row"];
export type CourseType = TablesType["course"]["Row"];
export type CourseBlockGroupType = TablesType["course_block_group"]["Row"];

export type InsertProgramType = TablesType["program"]["Insert"];
export type InsertCourseBlockGroupType =
  TablesType["course_block_group"]["Insert"];
export type InsertCourseBlockType = TablesType["course_block"]["Insert"];
export type InsertCourseType = TablesType["course"]["Insert"];

export type UpdateCourseType = TablesType["course"]["Update"];
export type UpdateCourseBlockType = TablesType["course_block"]["Update"];
export type UpdateCourseBlockGroupType =
  TablesType["course_block_group"]["Update"];
export type UpdateProgramType = TablesType["program"]["Update"];

export type CourseEnumType = Database["public"]["Enums"]["course_type"];
export const CourseEnum: CourseEnumType[] = ["STANDARD", "OTHER"];

export type FullProgramType = ProgramType & {
  courseCount: number;
  courseCredits: number;
  totalCredits: number;
  resolveClassUrl: (course: FullCourseType) => string;
  courseBlockGroups: (CourseBlockGroupType & {
    courseBlocks: (CourseBlockType & {
      courses: CourseType[];
    })[];
  })[];
};

export type FullCourseBlockGroupType =
  FullProgramType["courseBlockGroups"][number];
export type FullCourseBlockType =
  FullCourseBlockGroupType["courseBlocks"][number];
export type FullCourseType = FullCourseBlockType["courses"][number];
