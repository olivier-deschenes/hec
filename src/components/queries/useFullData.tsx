import { supabase } from "@/lib/supabase";
import { FullProgramType, ProgramType } from "@/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

type Params = {
  program_id: ProgramType["id"];
};

const get = async ({ program_id }: Params) => {
  const [
    { data: programs },
    { data: courseBlockGroups },
    { data: courseBlocks },
    { data: courses },
  ] = await Promise.all([
    supabase.from("program").select().eq("id", program_id),
    supabase.from("course_block_group").select().eq("program_id", program_id),
    supabase.from("course_block").select().eq("program_id", program_id),
    supabase.from("course").select().eq("program_id", program_id),
  ]);

  if (!programs) {
    throw new Error("Program not found");
  }

  if (!courseBlockGroups) {
    throw new Error("CourseBlockGroup not found");
  }

  if (!courseBlocks) {
    throw new Error("CourseBlock not found");
  }

  if (!courses) {
    throw new Error("Course not found");
  }

  const fullProgram: FullProgramType = {
    ...programs[0],
    courseCount: courses.length,
    courseCredits: courseBlocks.reduce(
      (acc, courseBlock) => acc + (courseBlock.credits ?? 0),
      0
    ),
    totalCredits: courseBlocks.reduce(
      (acc, courseBlock) => acc + (courseBlock.credits ?? 0),
      0
    ),
    resolveClassUrl: (classData) =>
      `https://www.hec.ca/cours/detail/?cours=${classData.prefix}${classData.code}`,
    courseBlockGroups: courseBlockGroups.map((courseBlockGroup) => ({
      ...courseBlockGroup,
      courseBlocks: courseBlocks
        .filter(
          (courseBlock) =>
            courseBlock.course_block_group_id === courseBlockGroup.id
        )
        .map((courseBlock) => ({
          ...courseBlock,
          courses: courses.filter(
            (course) => course.course_block_id === courseBlock.id
          ),
        })),
    })),
  };

  return fullProgram;
};

export const USE_FULL_PROGRAM_KEY = "fullProgram";

export const fullProgramQueryOptions = ({ program_id }: Params) =>
  queryOptions({
    queryKey: [USE_FULL_PROGRAM_KEY, program_id],
    queryFn: () => get({ program_id: program_id }),
  });

export const useFullProgram = ({ program_id: programId }: Params) => {
  return useQuery(fullProgramQueryOptions({ program_id: programId }));
};
