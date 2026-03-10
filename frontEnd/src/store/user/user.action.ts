

// ----------------------------
// GET ALL USER PROGRESS
// ----------------------------
import type {Dispatch} from "react";
import {PROGRESS_ACTION_TYPES, type ProgressActionTypes} from "store/user/user.types.ts";
import api from "api/api.ts";

export const fetchAllProgress =
    (email: string) => async (dispatch: Dispatch<ProgressActionTypes>) => {
        const payload = await api.entities.UserProgress.filter({
            user_email: email,
        });

        dispatch({
            type: PROGRESS_ACTION_TYPES.GET_ALL_PROGRESS,
            payload,
        });
    };

// ----------------------------
// GET PROGRESS FOR ONE COURSE
// ----------------------------
export const fetchProgressForCourse =
    (email: string, courseId: string) =>
        async (dispatch: Dispatch<ProgressActionTypes>) => {
            const payload = await api.entities.UserProgress.filter({
                user_email: email,
                course_id: courseId,
            });

            dispatch({
                type: PROGRESS_ACTION_TYPES.GET_PROGRESS_FOR_COURSE,
                payload,
            });
        };

// ----------------------------
// UPDATE PROGRESS (complete a lesson)
// ----------------------------
export const updateProgress =
    (payload: any) => async (dispatch: Dispatch<ProgressActionTypes>) => {
        const updated = await api.entities.UserProgress.update(payload.id, payload);

        dispatch({
            type: PROGRESS_ACTION_TYPES.UPDATE_PROGRESS,
            payload: updated,
        });
    };

// ----------------------------
// CLEAR STORE
// ----------------------------
export const clearProgress =
    () => async (dispatch: Dispatch<ProgressActionTypes>) => {
        dispatch({
            type: PROGRESS_ACTION_TYPES.CLEAR_PROGRESS,
        });
    };
