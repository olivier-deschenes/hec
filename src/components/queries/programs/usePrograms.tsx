import { supabase } from "@/lib/supabase";
import { queryOptions, useQuery } from "@tanstack/react-query";

const get = async () => {
  const { data } = await supabase.from("program_v2").select();

  if (!data) {
    return [];
  }

  return data;
};

export const USE_PROGRAMS_KEY = "programs";

export const programsQueryOptions = queryOptions({
    queryKey: [USE_PROGRAMS_KEY],
    queryFn: () => get(),
    staleTime: Infinity,
  });

export const usePrograms = () => {
  return useQuery(programsQueryOptions);
};
