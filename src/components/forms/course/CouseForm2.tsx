"use client";

import { FormContent } from "@/components/forms/parts/FormContent";
import { FormFooter } from "@/components/forms/parts/FormFooter";
import { FormRow } from "@/components/forms/parts/FormRow";
import { useCourse } from "@/components/queries/courses/useCourse";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useDeleteCourse } from "@/mutations/course/useDeleteCourse";
import { useInsertCourse } from "@/mutations/course/useInsertCourse";
import { useUpdateCourse } from "@/mutations/course/useUpdateCourse";
import type {
	CourseBlockType,
	CourseEnumType,
	CourseType,
	ProgramType,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const courseTypes: Array<{ label: string; value: CourseEnumType }> = [
	{ label: "Standard", value: "STANDARD" },
	{ label: "Autre", value: "OTHER" },
] as const;

const FormSchema = z.object({
	code: z.string(),
	prefix: z.string(),
	title: z.string(),
	done: z.boolean().default(false),
	program_id: z.number(),
	course_block_id: z.number(),
	credits: z.number().nullable().default(null),
	type: z.enum(["STANDARD", "OTHER"]).default("STANDARD"),
	id: z.number().optional(),
});

type Props = {
	program_id: ProgramType["id"];
	course_block_id: CourseBlockType["id"];
	course_id?: CourseType["id"];
	close: () => void;
};

export function CourseForm2({
	program_id,
	course_block_id,
	course_id,
	close,
}: Props) {
	const { data, status } = useCourse({ course_id: course_id! });

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: data ?? {
			done: false,
			program_id,
			course_block_id,
			code: "",
			prefix: "",
			title: "",
			credits: 3,
			type: "STANDARD",
		},
	});

	useEffect(() => {
		if (data) {
			form.reset(data);
		}
	}, [data, form]);

	const { mutate: insert } = useInsertCourse();
	const { mutate: update } = useUpdateCourse();
	const { mutate: m_delete, isPending } = useDeleteCourse();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			if (course_id) {
				await update(data);
			} else {
				await insert(data);
			}
			form.reset();
			close();
		} catch (err) {
			console.error(err);
		}
	}

	if (status === "error") {
		return <div>Error</div>;
	}

	const isLoading = status === "pending";

	return (
		<Form {...form}>
			<FormContent
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn(
					"relative",
					isLoading && "pointer-events-none opacity-75",
				)}
			>
				{isLoading ? (
					<div
						className={
							"absolute inset-0 m-auto flex h-full w-full items-center justify-center gap-2.5"
						}
					>
						<LoaderCircle size={24} className={"animate-spin"} />
						<span>Loading...</span>
					</div>
				) : null}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormRow>
					<FormField
						control={form.control}
						name="prefix"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Prefix</FormLabel>
								<FormControl>
									<Input placeholder="prefix" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="code"
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
				</FormRow>
				<FormRow>
					<FormField
						control={form.control}
						name="credits"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Credits</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="credits"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
										value={Number(field.value)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="done"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Done</FormLabel>
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
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Course Type</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"justify-between",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value
												? courseTypes.find(
														(language) => language.value === field.value,
													)?.label
												: "Select language"}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandList>
											<CommandGroup>
												{courseTypes.map((type) => (
													<CommandItem
														value={type.label}
														key={type.value}
														onSelect={() => {
															form.setValue("type", type.value);
														}}
													>
														<Check
															className={cn(
																"mr-2 h-4 w-4",
																type.value === field.value
																	? "opacity-100"
																	: "opacity-0",
															)}
														/>
														{type.label}
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormFooter
					isEdit={course_id !== undefined}
					isPending={isPending}
					onDeleteClick={() => m_delete(course_id!)}
					onCancelClick={close}
				/>
			</FormContent>
		</Form>
	);
}
