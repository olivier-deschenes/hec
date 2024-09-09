import { coursesQueryOptions } from "@/components/queries/courses/useCourses";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { CourseBlockGroupType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type PostCourseData = Omit<CourseBlockGroupType, "id">;

const post = async (postData: PostCourseData) => {
  const { data } = await supabase.from("course_block_group").insert(postData).select();

  return data;
};

const POST_COURSE_GROUP_BLOCK__KEY = "postCourseBlockGroup";

export const usePostCourseBlockGroup = () => {
  return useMutation({
    mutationFn: post,
    mutationKey: [POST_COURSE_GROUP_BLOCK__KEY],
    onSuccess: (data) => {
      const [newCourse] = data!;

      toast.success("Successfully" + JSON.stringify(data));

      queryClient.invalidateQueries({
        queryKey: coursesQueryOptions({ program_id: newCourse.program_id })
          .queryKey,
      });
    },
    onError: () => {
      toast.error("Failed to create course");
    },
  });
};
