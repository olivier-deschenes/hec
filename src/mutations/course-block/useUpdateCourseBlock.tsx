import { fullProgramQueryOptions } from "@/components/queries/useFullData";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { UpdateCourseBlockType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const fn = async (entity: UpdateCourseBlockType) => {
  const { data } = await supabase
    .from("course_block")
    .update(entity)
    .eq("id", entity.id!)
    .select();

  if (!data) {
    throw new Error("Error");
  }

  return data[0];
};

export const useUpdateCourseBlock = () => {
  return useMutation({
    mutationFn: fn,
    mutationKey: ["updateCourseBlock"],
    onSuccess: ({ program_id }) => {
      toast.success("Course created successfully");

      queryClient.invalidateQueries({
        queryKey: fullProgramQueryOptions({ program_id }).queryKey,
      });
    },
    onError: () => {
      toast.error("Failed to create course");
    },
  });
};
