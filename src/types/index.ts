import { Database } from "@/types/database.types";

export type ID = number;
export type UUID = string;
export type Timestamp = number;

type TablesType = Database["public"]["Tables"];

export type ProgramType = TablesType["program"]["Row"];
export type CourseBlockType = TablesType["course_block"]["Row"];
export type CourseType = TablesType["course"]["Row"];
export type CourseBlockGroupType = TablesType["course_block_group"]["Row"];

export type PostProgramType = TablesType["program"]["Insert"]
export type PostCourseBlockGroupType = TablesType["course_block_group"]["Insert"]
export type PostCourseBlockType = TablesType["course_block"]["Insert"]
export type PostCourseType = TablesType["course"]["Insert"]

export type FullProgramType = ProgramType & {
  courseCount: number;
  courseCredits: number;
  totalCredits: number;
  resolveClassUrl: (course: FullCourseType) => string;
  courseBlockGroups: (CourseBlockGroupType & {
    courseBlocks: (CourseBlockType & {
      courses: CourseType[]
    })[];
  })[];
};

export type FullCourseBlockGroupType = FullProgramType["courseBlockGroups"][number]
export type FullCourseBlockType = FullCourseBlockGroupType["courseBlocks"][number]
export type FullCourseType = FullCourseBlockType["courses"][number]
