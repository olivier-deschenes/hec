import { fullProgramQueryOptions } from "@/components/queries/useFullData";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { FullCourseBlockGroupType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const post = async (id: FullCourseBlockGroupType["id"]) => {
  const { data } = await supabase
    .from("course_block")
    .delete()
    .eq("id", id)
    .select();

  if (!data) {
    throw new Error("Error");
  }

  return data[0];
};

export const useDeleteCourseBlockGroup = () => {
  return useMutation({
    mutationFn: post,
    mutationKey: ["deleteCourseBlockGroup"],
    onSuccess: ({ program_id }) => {
      toast.success("Course deleted successfully");

      queryClient.invalidateQueries({
        queryKey: fullProgramQueryOptions({ program_id }).queryKey,
      });
    },
    onError: () => {
      toast.error("Failed to create course");
    },
  });
};
