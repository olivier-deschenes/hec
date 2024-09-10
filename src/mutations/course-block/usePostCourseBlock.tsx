import { fullProgramQueryOptions } from "@/components/queries/useFullData";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { PostCourseBlockType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const post = async (postData: PostCourseBlockType) => {
  const { data } = await supabase
    .from("course_block")
    .insert(postData)
    .select();

  if (!data) {
    throw new Error("Error");
  }

  return data[0];
};

const POST_COURSE_BLOCK_KEY = "postCourseBlock";

export const usePostCourseBlock = () => {
  return useMutation({
    mutationFn: post,
    mutationKey: [POST_COURSE_BLOCK_KEY],
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
