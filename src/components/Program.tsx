import { CourseBlockGroupProvider } from "../contexts/CourseBlockGroupContext";
import { ProgramProvider } from "../contexts/ProgramContext";
import type { ProgramTypeOld } from "../data/data";
import { Group } from "./Group";

type Props = {
  program: ProgramTypeOld;
};

export const OldProgram = ({ program }: Props) => {
  return (
    <ProgramProvider program={program}>
      <div className={"p-5 flex flex-col gap-5"}>
        <div>
          <h1 className={"text-3xl font-bold"}>{program.title}</h1>
          <div>
            <div>
              <span className={"font-bold"}>Cours:</span> {program.courseCount}{" "}
              cours <span>{`(${program.courseCredits} crédits)`}</span>
            </div>
            <div>
              <span className={"font-bold"}>Total Crédits : </span>{" "}
              {program.totalCredits} crédits
            </div>
          </div>
        </div>
        <div className={"flex flex-col gap-10"}>
          {program.courseBlockGroupes.map((courseBlockGroup) => (
            <CourseBlockGroupProvider
              courseBlockGroupType={courseBlockGroup}
              key={courseBlockGroup.id}
            >
              <Group />
            </CourseBlockGroupProvider>
          ))}
        </div>
      </div>
    </ProgramProvider>
  );
};
