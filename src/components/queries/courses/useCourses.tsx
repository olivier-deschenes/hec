import { supabase } from "@/lib/supabase";
import { CourseType } from "@/types/Course";
import { queryOptions, useQuery } from "@tanstack/react-query";

type Params = {
  program_id: CourseType["program_id"];
};

const get = async ({ program_id }: Params) => {
  const { data } = await supabase
    .from("course")
    .select()
    .eq("program_id", program_id);

  if (!data) {
    return [];
  }

  return data as CourseType[];
};

export const USE_COURSES_KEY = "courses";

export const coursesQueryOptions = ({ program_id }: Params) =>
  queryOptions({
    queryKey: [USE_COURSES_KEY, program_id],
    queryFn: () => get({ program_id }),
  });

export const useCourses = (params: Params) => {
  return useQuery(coursesQueryOptions(params));
};
