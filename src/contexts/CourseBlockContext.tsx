import { createContext, useCallback, useMemo, useState } from "react";
import { useCourseBlockGroupContext } from ".";
import {
  type CourseBlockType,
  type CourseType,
  getCourseKey,
  getMaxCreditsOfCourseBlock,
} from "../data/data";

type CourseBlockStateType = {
  selectedCourseKeys: string[];
  totalSelectedCredits: number;
  canSelectMore: boolean;
};
export type CourseBlockContextType = {
  courseBlockType: CourseBlockType;
  toggleCourse: (course: CourseType) => void;
} & CourseBlockStateType;

export const CourseBlockContext = createContext<CourseBlockContextType | null>(
  null
);

export const CourseBlockProvider = ({
  courseBlockType,
  children,
}: {
  courseBlockType: CourseBlockType;
  children: React.ReactNode;
}) => {
  const groupToggleCourse = useCourseBlockGroupContext().toggleCourse;

  const [selectedCourseKeys, setSelectedCourseKeys] =
    useState<CourseBlockStateType>({
      selectedCourseKeys: [],
      totalSelectedCredits: 0,
      canSelectMore: true,
    });

  const toggleCourse = useCallback(
    (course: CourseType) => {
      const key = getCourseKey(course);

      const index = selectedCourseKeys.selectedCourseKeys.indexOf(key);

      if (index === -1) {
        const maxCredits = getMaxCreditsOfCourseBlock(courseBlockType);
        const newCredits =
          selectedCourseKeys.totalSelectedCredits + course.credits;

        if (newCredits > maxCredits) {
          return;
        }

        setSelectedCourseKeys((prev) => ({
          ...prev,
          selectedCourseKeys: [...prev.selectedCourseKeys, key],
          totalSelectedCredits: prev.totalSelectedCredits + course.credits,
          canSelectMore: newCredits < maxCredits,
        }));
      } else {
        setSelectedCourseKeys((prev) => ({
          ...prev,
          selectedCourseKeys: [
            ...prev.selectedCourseKeys.slice(0, index),
            ...prev.selectedCourseKeys.slice(index + 1),
          ],
          totalSelectedCredits: prev.totalSelectedCredits - course.credits,
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
