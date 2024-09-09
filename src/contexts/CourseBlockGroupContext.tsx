import { createContext, useCallback, useMemo, useState } from "react";
import {
  type CourseBlockGroupType,
  type CourseTypeOld,
  getCourseKey,
} from "../data/data";

type CourseBlockGroupStateType = {
  selectedCourseKeys: string[];
  totalSelectedCredits: number;
  canSelectMore: boolean;
};
export type CourseBlockGroupContextType = {
  courseBlockGroupType: CourseBlockGroupType;
  toggleCourse: (course: CourseTypeOld) => void;
} & CourseBlockGroupStateType;

export const CourseBlockGroupContext =
  createContext<CourseBlockGroupContextType | null>(null);

export const CourseBlockGroupProvider = ({
  courseBlockGroupType,
  children,
}: {
  courseBlockGroupType: CourseBlockGroupType;
  children: React.ReactNode;
}) => {
  const [selectedCourseKeys, setSelectedCourseKeys] =
    useState<CourseBlockGroupStateType>({
      selectedCourseKeys: [],
      totalSelectedCredits: 0,
      canSelectMore: true,
    });

  const toggleCourse = useCallback(
    (course: CourseTypeOld) => {
      const key = getCourseKey(course);

      const index = selectedCourseKeys.selectedCourseKeys.indexOf(key);

      if (index === -1) {
        const newCredits =
          selectedCourseKeys.totalSelectedCredits + course.credits;

        if (
          courseBlockGroupType.credits &&
          newCredits > courseBlockGroupType.credits
        ) {
          return;
        }

        setSelectedCourseKeys((prev) => ({
          ...prev,
          selectedCourseKeys: [...prev.selectedCourseKeys, key],
          totalSelectedCredits: prev.totalSelectedCredits + course.credits,
          canSelectMore:
            !courseBlockGroupType.credits ||
            courseBlockGroupType.credits > newCredits,
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
    },
    [
      courseBlockGroupType.credits,
      selectedCourseKeys.selectedCourseKeys,
      selectedCourseKeys.totalSelectedCredits,
    ]
  );

  const value: CourseBlockGroupContextType = useMemo(
    () => ({ courseBlockGroupType, ...selectedCourseKeys, toggleCourse }),
    [courseBlockGroupType, selectedCourseKeys, toggleCourse]
  );
  return (
    <CourseBlockGroupContext.Provider value={value}>
      {children}
    </CourseBlockGroupContext.Provider>
  );
};
