import type {Lesson} from "store/types/api.types.ts";

export const LESSON_ACTION_TYPES = {
    GET_LESSONS: "GET_LESSONS",
    GET_LESSONS_BY_COURSE: "GET_LESSONS_BY_COURSE",
    GET_ONE_LESSON: "GET_ONE_LESSON",
    CLEAR_ACTIVE_LESSON: "CLEAR_ACTIVE_LESSON",
} as const;

export interface LessonState {
    list: Lesson[];
    byCourse: Lesson[];
    active: Lesson | null;
}

// ---------- ACTIONS ----------

export type GetLessons = {
    type: typeof LESSON_ACTION_TYPES.GET_LESSONS;
    payload: Lesson[];
};

export type GetLessonsByCourse = {
    type: typeof LESSON_ACTION_TYPES.GET_LESSONS_BY_COURSE;
    payload: Lesson[];
};

export type GetOneLesson = {
    type: typeof LESSON_ACTION_TYPES.GET_ONE_LESSON;
    payload: Lesson;
};

export type ClearLesson = {
    type: typeof LESSON_ACTION_TYPES.CLEAR_ACTIVE_LESSON;
};

export type LessonActionTypes =
    | GetLessons
    | GetLessonsByCourse
    | GetOneLesson
    | ClearLesson;
