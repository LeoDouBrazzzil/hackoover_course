import type {UserProgress} from "store/types/api.types.ts";

export const PROGRESS_ACTION_TYPES = {
    GET_PROGRESS_FOR_COURSE: "GET_PROGRESS_FOR_COURSE",
    GET_ALL_PROGRESS: "GET_ALL_PROGRESS",
    UPDATE_PROGRESS: "UPDATE_PROGRESS",
    CLEAR_PROGRESS: "CLEAR_PROGRESS",
} as const;

export interface ProgressState {
    all: UserProgress[];
    byCourse: UserProgress[];
}

export type GetAllProgress = {
    type: typeof PROGRESS_ACTION_TYPES.GET_ALL_PROGRESS;
    payload: UserProgress[];
};

export type GetProgressForCourse = {
    type: typeof PROGRESS_ACTION_TYPES.GET_PROGRESS_FOR_COURSE;
    payload: UserProgress[];
};

export type UpdateProgress = {
    type: typeof PROGRESS_ACTION_TYPES.UPDATE_PROGRESS;
    payload: UserProgress;
};

export type ClearProgress = {
    type: typeof PROGRESS_ACTION_TYPES.CLEAR_PROGRESS;
};

export type ProgressActionTypes =
    | GetAllProgress
    | GetProgressForCourse
    | UpdateProgress
    | ClearProgress;
