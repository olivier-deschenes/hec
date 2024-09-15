import { CourseForm2 } from "@/components/forms/course/CouseForm2";
import { useFullProgram } from "@/components/queries/useFullData";
import { Group } from "@/components/test/Group";
import { CourseBlockGroupProvider } from "@/contexts/CourseBlockGroupContext";
import { ProgramProvider } from "@/contexts/ProgramContext";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { z } from "zod";

function Component() {
	const { program_id } = Route.useParams();
	const search = Route.useSearch();
	const navigate = useNavigate();

	const { data, status } = useFullProgram({ program_id: Number(program_id) });

	const onClickCollapse = () => {
		navigate({
			to: `/programs/${program_id}`,
			search: undefined,
		});
	};

	if (status === "error") {
		return <div>Error</div>;
	}

	if (!data) {
		return <div>Error</div>;
	}

	const isOpen = search?.form === "course";

	return (
		<ProgramProvider program={data}>
			<PanelGroup direction="horizontal">
				<Panel defaultSize={30} minSize={20} className={""}>
					<div className={"p-5 flex flex-col gap-5 h-screen overflow-auto"}>
						<div>
							<h1 className={"text-3xl font-bold"}>{data.title}</h1>
							<div>
								<div>
									<span className={"font-bold"}>Cours:</span> {data.courseCount}{" "}
									cours <span>{`(${data.courseCredits} crédits)`}</span>
								</div>
								<div>
									<span className={"font-bold"}>Total Crédits : </span>{" "}
									{data.totalCredits} crédits
								</div>
							</div>
						</div>
						<div>{/* <CourseBlockGroupForm program_id={data.id} /> */}</div>
						<div className={"flex flex-col gap-10"}>
							{data.courseBlockGroups.map((courseBlockGroup) => (
								<CourseBlockGroupProvider
									courseBlockGroupType={courseBlockGroup}
									key={courseBlockGroup.id}
								>
									<Group />
								</CourseBlockGroupProvider>
							))}
						</div>
					</div>
				</Panel>
				{isOpen ? <PanelResizeHandle className="w-1 bg-[#0169BF]" /> : null}
				<Panel
					defaultSize={isOpen ? 30 : 0}
					minSize={20}
					collapsible={isOpen}
					collapsedSize={0}
					maxSize={isOpen ? 50 : 0}
					className={"transition-all p-5"}
				>
					{search?.form === "course" ? (
						<CourseForm2
							program_id={data.id}
							course_block_id={search.course_block_id}
							course_id={search.course_id}
							close={onClickCollapse}
						/>
					) : null}
				</Panel>
			</PanelGroup>
		</ProgramProvider>
	);
}

const BaseSchema = z.object({
	form: z.enum(["course", "course_block"]),
});

const CourseSchema = BaseSchema.extend({
	form: z.literal("course"),
	course_id: z.number(),
	course_block_id: z.number(),
});

const CourseBlockSchema = BaseSchema.extend({
	form: z.literal("course_block"),
	course_block_id: z.number(),
});

const EmptyObjectSchema = z.object({}).transform(() => undefined);

const programSearchSchema = z.union([
	z.discriminatedUnion("form", [CourseSchema, CourseBlockSchema]),
	EmptyObjectSchema,
]);

export const Route = createFileRoute("/programs/$program_id")({
	component: Component,
	validateSearch: programSearchSchema.parse,
});
