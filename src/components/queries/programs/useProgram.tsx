import { supabase } from "@/lib/supabase";
import { ProgramType } from "@/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

type Params = {
  programId: ProgramType["id"];
};

const get = async ({ programId }: Params) => {
  const { data } = await supabase.from("program").select().eq("id", programId);

  if (!data || data.length === 0) {
    throw new Error("Program not found");
  }

  return data[0];
};

export const USE_PROGRAM_KEY = "program";

export const programQueryOptions = ({ programId }: Params) =>
  queryOptions({
    queryKey: [USE_PROGRAM_KEY, programId],
    queryFn: () => get({ programId }),
  });

export const useProgram = ({ programId }: Params) => {
  return useQuery(programQueryOptions({ programId }));
};
