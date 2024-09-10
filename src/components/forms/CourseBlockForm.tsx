"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CourseBlockGroupType, ProgramType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { usePostCourseBlock } from "@/mutations/course-block/usePostCourseBlock";

const FormSchema = z.object({
  title: z.string(),
  course_block_group_id: z.number(),
  program_id: z.number(),
  credits: z.number().nullable().default(null),
  minimum_credits: z.number().nullable().default(null),
  maximum_credits: z.number().nullable().default(null),
});

type Props = {
  course_block_group_id: CourseBlockGroupType["id"];
  program_id: ProgramType["id"];
};

export function CourseBlockForm({ course_block_group_id, program_id }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      course_block_group_id,
      program_id,
      credits: null,
      minimum_credits: null,
      maximum_credits: null,
    },
  });

  const { mutate } = usePostCourseBlock();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={
            "w-40 h-40 bg-slate-50 rounded-md justify-center items-center flex hover:bg-slate-100 transition-colors"
          }
        >
          <div className={"flex items-center justify-center flex-col gap-1"}>
            <div>
              <PlusCircledIcon width={24} height={24} />
            </div>
            <div className={"text-sm"}>Add Course Block</div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
