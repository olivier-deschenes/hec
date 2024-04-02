import { createContext } from "react";
import type { ProgramType } from "../data/data";

export const ProgramContext = createContext<ProgramType | null>(null);

export const ProgramProvider = ({
  program,
  children,
}: {
  program: ProgramType;
  children: React.ReactNode;
}) => {
  return (
    <ProgramContext.Provider value={program}>
      {children}
    </ProgramContext.Provider>
  );
};
