import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type PostProgramData = object;

const post = async (postData: PostProgramData) => {
  console.log(postData);

  const { data } = await supabase.from("program_v2").insert(postData).select();

  console.log(data);

  return data;
};

const POST_PROGRAM_KEY = "createBook";

export const usePostProgram = () => {
  return useMutation({
    mutationFn: post,
    mutationKey: [POST_PROGRAM_KEY],
    onSuccess: (data) => {
      toast.success("Program created successfully" + JSON.stringify(data));
    },
    onError: () => {
      toast.error("Failed to create program");
    },
  });
};
