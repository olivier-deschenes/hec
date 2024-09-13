import { fullProgramQueryOptions } from "@/components/queries/useFullData";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { InsertCourseType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const fn = async (postData: InsertCourseType) => {
  const { data } = await supabase.from("course").insert(postData).select();

  return data;
};

const KEY = "insertCourse";

export const useInsertCourse = () => {
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
