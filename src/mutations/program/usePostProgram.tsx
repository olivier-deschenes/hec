import { programsQueryOptions } from "@/components/queries/programs/usePrograms";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { InsertProgramType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const post = async (postData: InsertProgramType) => {
  const { data } = await supabase.from("program").insert(postData).select();

  if (!data || !data.length) {
    throw new Error("Error");
  }

  return data[0];
};

const POST_PROGRAM_KEY = "postProgram";

export const usePostProgram = () => {
  return useMutation({
    mutationFn: post,
    mutationKey: [POST_PROGRAM_KEY],
    onSuccess: (data) => {
      toast.success("Program created successfully : " + data.title);

      queryClient.invalidateQueries({
        queryKey: programsQueryOptions.queryKey,
      });
    },
    onError: () => {
      toast.error("Failed to create program");
    },
  });
};
