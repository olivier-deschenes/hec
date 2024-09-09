import { createContext } from "react";
import type { ProgramTypeOld } from "../data/data";

export const ProgramContext = createContext<ProgramTypeOld | null>(null);

export const ProgramProvider = ({
  program,
  children,
}: {
  program: ProgramTypeOld;
  children: React.ReactNode;
}) => {
  return (
    <ProgramContext.Provider value={program}>
      {children}
    </ProgramContext.Provider>
  );
};
