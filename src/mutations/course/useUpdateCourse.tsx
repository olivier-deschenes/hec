import { fullProgramQueryOptions } from "@/components/queries/useFullData";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { UpdateCourseType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const fn = async (entity: UpdateCourseType) => {
  const { data } = await supabase
    .from("course")
    .update(entity)
    .eq("id", entity.id!)
    .select();

  return data;
};

const KEY = "updateCourse";

export const useUpdateCourse = () => {
  return useMutation({
    mutationFn: fn,
    mutationKey: [KEY],
    onSuccess: (data) => {
      const [newCourse] = data!;

      toast.success("Course created successfully" + JSON.stringify(data));

      queryClient.invalidateQueries({
        queryKey: fullProgramQueryOptions({ program_id: newCourse.program_id })
          .queryKey,
      });
    },
    onError: () => {
      toast.error("Failed to create course");
    },
  });
};
