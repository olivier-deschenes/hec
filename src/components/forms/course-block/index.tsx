"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { BaseForm } from "@/components/forms/base";
import type { BaseFormRef } from "@/components/forms/base/type";
import { FormContent } from "@/components/forms/parts/FormContent";
import { FormFooter } from "@/components/forms/parts/FormFooter";
import { FormRow } from "@/components/forms/parts/FormRow";
import { Input } from "@/components/ui/input";
import { useDeleteCourseBlock } from "@/mutations/course-block/useDeleteCourseBlock";
import { useInsertCourseBlock } from "@/mutations/course-block/useInsertCourseBlock";
import { useUpdateCourseBlock } from "@/mutations/course-block/useUpdateCourseBlock";
import type {
	CourseBlockGroupType,
	ProgramType,
	UpdateCourseBlockType,
} from "@/types";

const FormSchema = z.object({
	title: z.string(),
	course_block_group_id: z.number(),
	program_id: z.number(),
	credits: z.coerce.number().nullable().default(null),
	minimum_credits: z.coerce.number().nullable().default(null),
	maximum_credits: z.coerce.number().nullable().default(null),
	id: z.number().optional(),
});

type Props = {
	course_block_group_id: CourseBlockGroupType["id"];
	program_id: ProgramType["id"];
	defaultData?: UpdateCourseBlockType;
	dialogRef: BaseFormRef;
};

export function CourseBlockForm({
	course_block_group_id,
	program_id,
	defaultData,
	dialogRef,
}: Props) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: defaultData ?? {
			title: "",
			course_block_group_id,
			program_id,
			credits: null,
			minimum_credits: null,
			maximum_credits: null,
		},
	});

	const { mutateAsync: insert } = useInsertCourseBlock();
	const { mutateAsync: update } = useUpdateCourseBlock();
	const { mutate: m_delete, isPending } = useDeleteCourseBlock();

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
								name="minimum_credits"
								render={() => (
									<FormItem>
										<FormLabel>Minimum Credits</FormLabel>
										<FormControl>
											<Input
												placeholder="minimum_credits"
												type="number"
												{...form.register("minimum_credits", {
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
								name="maximum_credits"
								render={() => (
									<FormItem>
										<FormLabel>Maximum Credits</FormLabel>
										<FormControl>
											<Input
												placeholder="maximum_credits"
												type="number"
												{...form.register("maximum_credits", {
													valueAsNumber: true,
												})}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormRow>
						<FormField
							control={form.control}
							name="credits"
							render={() => (
								<FormItem>
									<FormLabel>Credits</FormLabel>
									<FormControl>
										<Input
											placeholder="credits"
											{...form.register("credits", {
												valueAsNumber: true,
											})}
											type={"number"}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
