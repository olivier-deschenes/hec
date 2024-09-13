import { fullProgramQueryOptions } from "@/components/queries/useFullData";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { InsertCourseBlockGroupType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const fn = async (postData: InsertCourseBlockGroupType) => {
  const { data } = await supabase
    .from("course_block_group")
    .insert(postData)
    .select();

  if (!data) {
    throw new Error("Error");
  }

  return data[0];
};

export const useInsertCourseBlockGroup = () => {
  return useMutation({
    mutationFn: fn,
    mutationKey: ["insertCourseBlockGroup"],
    onSuccess: (data) => {
      toast.success("Successfully");

      queryClient.invalidateQueries({
        queryKey: fullProgramQueryOptions({ program_id: data.program_id })
          .queryKey,
      });
    },
    onError: () => {
      toast.error("Failed to create course");
    },
  });
};
