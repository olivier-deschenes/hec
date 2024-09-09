import { useCourses } from "@/components/queries/courses/useCourses";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProgramType } from "@/types/Program";

type CoursesListProps = {
  program_id: ProgramType["id"];
};

export function CoursesList({ program_id }: CoursesListProps) {
  const { data, status } = useCourses({ program_id });

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>Courses</h1>
      {status === "pending" ? "Loading..." : null}
      <Table>
        <TableCaption>Courses list.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Code</TableHead>
            <TableHead>Prefix</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Done</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.code}</TableCell>
              <TableCell>{course.prefix}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell className="text-right">
                {course.done ? "✅" : "❌"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
