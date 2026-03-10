
import type { LessonActionTypes } from "./lesson.types";
import { LESSON_ACTION_TYPES } from "./lesson.types";
import type {Dispatch} from "react";
import api from "api/api.ts";

// ----------------------------
// GET ALL LESSONS
// ----------------------------
export const fetchLessons =
    () => async (dispatch: Dispatch<LessonActionTypes>) => {
        const payload = await api.entities.Lesson.list();
        dispatch({
            type: LESSON_ACTION_TYPES.GET_LESSONS,
            payload,
        });
    };

// ----------------------------
// GET LESSONS FOR A COURSE
// ----------------------------
export const fetchLessonsByCourse =
    (courseId: string) => async (dispatch: Dispatch<LessonActionTypes>) => {
        const payload = await api.entities.Lesson.filter({
            course_id: courseId,
        });

        dispatch({
            type: LESSON_ACTION_TYPES.GET_LESSONS_BY_COURSE,
            payload,
        });
    };

// ----------------------------
// GET ONE LESSON BY ID
// (Spring renverra /lesson/{id})
// ----------------------------
export const fetchOneLesson =
    (lesson: any) => async (dispatch: Dispatch<LessonActionTypes>) => {
        dispatch({
            type: LESSON_ACTION_TYPES.GET_ONE_LESSON,
            payload: lesson,
        });
    };

// ----------------------------
// CLEAR ACTIVE
// ----------------------------
export const clearActiveLesson =
    () => async (dispatch: Dispatch<LessonActionTypes>) => {
        dispatch({
            type: LESSON_ACTION_TYPES.CLEAR_ACTIVE_LESSON,
        });
    };
