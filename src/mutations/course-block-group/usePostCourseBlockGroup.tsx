import { fullProgramQueryOptions } from "@/components/queries/useFullData";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { PostCourseBlockGroupType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const post = async (postData: PostCourseBlockGroupType) => {
  const { data } = await supabase
    .from("course_block_group")
    .insert(postData)
    .select();

  if (!data) {
    throw new Error("Error");
  }

  return data[0];
};

const POST_COURSE_GROUP_BLOCK__KEY = "postCourseBlockGroup";

export const usePostCourseBlockGroup = () => {
  return useMutation({
    mutationFn: post,
    mutationKey: [POST_COURSE_GROUP_BLOCK__KEY],
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
