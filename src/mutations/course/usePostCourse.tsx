import { fullProgramQueryOptions } from "@/components/queries/useFullData";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { PostCourseType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const post = async (postData: PostCourseType) => {
  const { data } = await supabase.from("course").insert(postData).select();

  return data;
};

const POST_COURSE_KEY = "postCourse";

export const usePostCourse = () => {
  return useMutation({
    mutationFn: post,
    mutationKey: [POST_COURSE_KEY],
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
