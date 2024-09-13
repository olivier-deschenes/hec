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
import { ProgramType, UpdateCourseBlockGroupType } from "@/types";
import { useInsertCourseBlockGroup } from "@/mutations/course-block-group/useInsertCourseBlockGroup";
import { Checkbox } from "@/components/ui/checkbox";
import { FormRow } from "@/components/forms/parts/FormRow";
import { useUpdateCourseBlockGroup } from "@/mutations/course-block-group/useUpdateCourseBlockGroup";
import { BaseForm } from "@/components/forms/base";

const FormSchema = z.object({
  title: z.string(),
  program_id: z.number(),
  optional: z.boolean().default(false),
  credits: z.number().nullable().default(null),
  id: z.number().optional(),
});

type Props = {
  program_id: ProgramType["id"];
  defaultData?: UpdateCourseBlockGroupType;
};

export function CourseBlockGroupForm({ program_id, defaultData }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultData ?? {
      title: "",
      program_id,
      credits: null,
    },
  });

  const { mutateAsync: insert } = useInsertCourseBlockGroup();
  const { mutateAsync: update } = useUpdateCourseBlockGroup();

  async function onSubmit(
    data: z.infer<typeof FormSchema>,
    setOpen: (open: boolean) => void
  ) {
    try {
      if (defaultData) {
        await update(data);
      } else {
        await insert(data);
      }
      form.reset();
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <BaseForm
      openButtonTitle={defaultData ? "Update" : "Create"}
      title={
        defaultData ? "Update Course Block Group" : "Create Course Block Group"
      }
    >
      {(setOpen) => (
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => onSubmit(data, setOpen))}>
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
            <FormRow>
              <FormField
                control={form.control}
                name="credits"
                render={() => (
                  <FormItem>
                    <FormLabel>Credits</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="credits"
                        type="number"
                        {...form.register("credits", {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="optional"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Optional</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormRow>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </BaseForm>
  );
}
