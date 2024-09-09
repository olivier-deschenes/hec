import { supabase } from "@/lib/supabase";
import { ProgramType } from "@/types/Program";
import { useQuery } from "@tanstack/react-query";

const get = async () => {
  const { data } = await supabase.from("program_v2").select();

  if (!data) {
    return [];
  }

  return data as ProgramType[];
};

export const USE_PROGRAMS_KEY = "programs";

export const usePrograms = () => {
  return useQuery({
    queryKey: [USE_PROGRAMS_KEY],
    queryFn: get,
    staleTime: Infinity,
  });
};
