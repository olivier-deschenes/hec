import { supabase } from "@/lib/supabase";
import type { CourseType } from "@/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

type Params = {
	course_id: CourseType["id"];
};

const fn = async ({ course_id }: Params) => {
	await new Promise((resolve) => setTimeout(resolve, 200));

	const { data } = await supabase.from("course").select().eq("id", course_id);

	if (!data) {
		throw new Error("Course not found");
	}

	return data[0];
};

export const courseQueryOptions = ({ course_id }: Params) =>
	queryOptions({
		queryKey: ["course", course_id],
		queryFn: () => fn({ course_id }),
		retry: false,
	});

export const useCourse = (params: Params) => {
	return useQuery(courseQueryOptions(params));
};
