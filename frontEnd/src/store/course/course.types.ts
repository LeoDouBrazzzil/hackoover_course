import type {Course} from "store/types/api.types.ts";

export const COURSE_ACTION_TYPES = {
    GET_COURSES: "GET_COURSES",
    GET_FEATURED: "GET_FEATURED",
    GET_ONE_COURSE: "GET_ONE_COURSE",
    CLEAR_SELECTED_COURSE: "CLEAR_SELECTED_COURSE",
} as const;

export interface CourseState {
    list: Course[];
    featured: Course[];
    selected: Course | null;
}

// ---- ACTIONS ----

export type GetCourses = {
    type: typeof COURSE_ACTION_TYPES.GET_COURSES;
    payload: Course[];
};

export type GetFeatured = {
    type: typeof COURSE_ACTION_TYPES.GET_FEATURED;
    payload: Course[];
};

export type GetOneCourse = {
    type: typeof COURSE_ACTION_TYPES.GET_ONE_COURSE;
    payload: Course;
};

export type ClearSelectedCourse = {
    type: typeof COURSE_ACTION_TYPES.CLEAR_SELECTED_COURSE;
};

export type CourseActionTypes =
    | GetCourses
    | GetFeatured
    | GetOneCourse
    | ClearSelectedCourse;
