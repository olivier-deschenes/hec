import { useContext } from "react";
import { CourseBlockContext } from "./CourseBlockContext";
import { CourseBlockGroupContext } from "./CourseBlockGroupContext";
import { ProgramContext } from "./ProgramContext";
import { AuthContext } from "@/contexts/AuthContext";

export const useProgramContext = () => {
  const context = useContext(ProgramContext);

  if (!context) {
    throw new Error("useProgramContext must be used within a ProgramProvider");
  }

  return context;
};

export const useCourseBlockGroupContext = () => {
  const courseBlock = useContext(CourseBlockGroupContext);

  if (!courseBlock) {
    throw new Error(
      "useCourseBlockGroupContext must be used within a CourseProvider"
    );
  }

  return courseBlock;
};

export const useCouseBlockContext = () => {
  const courseBlock = useContext(CourseBlockContext);

  if (!courseBlock) {
    throw new Error(
      "useCouseBlockContext must be used within a CourseBlockProvider"
    );
  }

  return courseBlock;
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return authContext;
};