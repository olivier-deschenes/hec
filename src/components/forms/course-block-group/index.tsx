"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BaseForm } from "@/components/forms/base";
import type { BaseFormRef } from "@/components/forms/base/type";
import { FormContent } from "@/components/forms/parts/FormContent";
import { FormFooter } from "@/components/forms/parts/FormFooter";
import { FormRow } from "@/components/forms/parts/FormRow";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useDeleteCourseBlockGroup } from "@/mutations/course-block-group/useDeleteCourseBlockGroup";
import { useInsertCourseBlockGroup } from "@/mutations/course-block-group/useInsertCourseBlockGroup";
import { useUpdateCourseBlockGroup } from "@/mutations/course-block-group/useUpdateCourseBlockGroup";
import type { ProgramType, UpdateCourseBlockGroupType } from "@/types";

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
	dialogRef: BaseFormRef;
};

export function CourseBlockGroupForm({
	program_id,
	defaultData,
	dialogRef,
}: Props) {
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
	const { mutate: m_delete, isPending } = useDeleteCourseBlockGroup();

	async function onSubmit(
		data: z.infer<typeof FormSchema>,
		setOpen: (open: boolean) => void,
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
			openButtonTitle={defaultData ? "Update" : "Add"}
			title={defaultData ? "Update Course Block" : "Are you absolutely sure?"}
			dialogRef={dialogRef}
		>
			{(setOpen) => (
				<Form {...form}>
					<FormContent
						onSubmit={form.handleSubmit((data) => onSubmit(data, setOpen))}
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
											<div className={"flex items-center"}>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormRow>
						<FormFooter
							isEdit={defaultData !== undefined}
							isPending={isPending}
							onDeleteClick={() => m_delete(defaultData?.id!)}
							onCancelClick={() => setOpen(false)}
						/>
					</FormContent>
				</Form>
			)}
		</BaseForm>
	);
}
