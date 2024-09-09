import { coursesQueryOptions } from "@/components/queries/courses/useCourses";
import { queryClient } from "@/lib/query";
import { supabase } from "@/lib/supabase";
import { CourseType } from "@/types/Course";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type PostCourseData = Omit<CourseType, "id">;

const post = async (postData: PostCourseData) => {
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

      console.log(newCourse);

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
