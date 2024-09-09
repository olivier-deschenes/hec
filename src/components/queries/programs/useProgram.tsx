import { ProgramTypeOld } from "@/data/data";
import { supabase } from "@/lib/supabase";
import { ProgramType } from "@/types/Program";
import { queryOptions, useQuery } from "@tanstack/react-query";

type Params = {
  programId: ProgramTypeOld["id"];
};

const get = async ({ programId }: Params) => {
  const { data } = await supabase
    .from("program_v2")
    .select()
    .eq("id", programId);

  if (!data || data.length === 0) {
    throw new Error("Program not found");
  }

  return data[0] as ProgramType;
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
