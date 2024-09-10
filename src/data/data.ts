import { FullCourseBlockType, FullCourseType } from "@/types";

export const getCourseKey = (course: FullCourseType) =>
  `${course.prefix}${course.code}`;

export const compateCourseToKey = (course: FullCourseType, key: string) =>
  getCourseKey(course) === key;

export const getmaximum_creditsOfCourseBlock = (courseBlock: FullCourseBlockType) => {
  if (courseBlock.credits !== null) {
    return courseBlock.credits;
  }

  return courseBlock.maximum_credits ?? 0;
};

export const getDoneCreditsOfCourseBlock = (courseBlock: FullCourseBlockType) => {
  return courseBlock.courses.reduce((acc, course) => {
    if (course.done) {
      return acc + (course.credits ?? 0);
    }

    return acc;
  }, 0);
};

