import { createContext, useCallback, useMemo, useState } from "react";
import { useCourseBlockGroupContext } from ".";
import {
  getCourseKey,
  getDoneCreditsOfCourseBlock,
  getmaximum_creditsOfCourseBlock,
} from "../data/data";
import { FullCourseBlockType, FullCourseType } from "@/types";

type CourseBlockStateType = {
  selectedCourseKeys: string[];
  totalSelectedCredits: number;
  canSelectMore: boolean;
};
export type CourseBlockContextType = {
  courseBlockType: FullCourseBlockType;
  toggleCourse: (course: FullCourseType) => void;
} & CourseBlockStateType;

export const CourseBlockContext = createContext<CourseBlockContextType | null>(
  null
);

export const CourseBlockProvider = ({
  courseBlockType,
  children,
}: {
  courseBlockType: FullCourseBlockType;
  children: React.ReactNode;
}) => {
  const groupToggleCourse = useCourseBlockGroupContext().toggleCourse;

  const [selectedCourseKeys, setSelectedCourseKeys] =
    useState<CourseBlockStateType>({
      selectedCourseKeys: [],
      totalSelectedCredits: getDoneCreditsOfCourseBlock(courseBlockType),
      canSelectMore: true,
    });

  const toggleCourse = useCallback(
    (course: FullCourseType) => {
      const key = getCourseKey(course);

      const index = selectedCourseKeys.selectedCourseKeys.indexOf(key);

      if (index === -1) {
        const maximum_credits =
          getmaximum_creditsOfCourseBlock(courseBlockType);
        const newCredits =
          selectedCourseKeys.totalSelectedCredits + (course.credits ?? 0);

        if (newCredits > maximum_credits) {
          return;
        }

        setSelectedCourseKeys((prev) => ({
          ...prev,
          selectedCourseKeys: [...prev.selectedCourseKeys, key],
          totalSelectedCredits:
            prev.totalSelectedCredits + (course.credits ?? 0),
          canSelectMore: newCredits < maximum_credits,
        }));
      } else {
        setSelectedCourseKeys((prev) => ({
          ...prev,
          selectedCourseKeys: [
            ...prev.selectedCourseKeys.slice(0, index),
            ...prev.selectedCourseKeys.slice(index + 1),
          ],
          totalSelectedCredits:
            prev.totalSelectedCredits - (course.credits ?? 0),
          canSelectMore: true,
        }));
      }

      groupToggleCourse(course);
    },
    [
      courseBlockType,
      groupToggleCourse,
      selectedCourseKeys.selectedCourseKeys,
      selectedCourseKeys.totalSelectedCredits,
    ]
  );

  const value: CourseBlockContextType = useMemo(
    () => ({
      courseBlockType,
      ...selectedCourseKeys,
      toggleCourse,
    }),
    [courseBlockType, selectedCourseKeys, toggleCourse]
  );
  return (
    <CourseBlockContext.Provider value={value}>
      {children}
    </CourseBlockContext.Provider>
  );
};
