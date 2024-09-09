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
import { usePostCourse } from "@/mutations/usePostCourse";
import { ProgramType } from "@/types";
import { usePostCourseBlockGroup } from "@/mutations/usePostCourseBlockGroup";

const FormSchema = z.object({
  title: z.string(),
  program_id: z.number(),
});

type Props = {
  program_id: ProgramType["id"];
};

export function CourseBlockGroupForm({ program_id }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      program_id,
    },
  });

  const { mutate } = usePostCourseBlockGroup();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
  );
}
