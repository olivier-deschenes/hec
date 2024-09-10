import { FullProgramType } from "@/types";
import { createContext } from "react";

export const ProgramContext = createContext<FullProgramType | null>(null);

export const ProgramProvider = ({
  program,
  children,
}: {
  program: FullProgramType;
  children: React.ReactNode;
}) => {
  return (
    <ProgramContext.Provider value={program}>
      {children}
    </ProgramContext.Provider>
  );
};
