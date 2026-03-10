import type { CourseActionTypes } from "./course.types";
import { COURSE_ACTION_TYPES } from "./course.types";
import type {Dispatch} from "react";
import api from "api/api.ts";

// ----------------------------
// GET ALL COURSES
// ----------------------------
export const fetchCourses =
    () => async (dispatch: Dispatch<CourseActionTypes>) => {
        const payload = await api.entities.Course.list();
        dispatch({
            type: COURSE_ACTION_TYPES.GET_COURSES,
            payload,
        });
    };

// ----------------------------
// GET FEATURED COURSES
// ----------------------------
export const fetchFeaturedCourses =
    () => async (dispatch: Dispatch<CourseActionTypes>) => {
        const payload = await api.entities.Course.filter(
            { is_featured: true },
            10
        );
        dispatch({
            type: COURSE_ACTION_TYPES.GET_FEATURED,
            payload,
        });
    };

// ----------------------------
// GET ONE COURSE BY ID
// ----------------------------
export const fetchCourseById =
    (id: string) => async (dispatch: Dispatch<CourseActionTypes>) => {
        const result = await api.entities.Course.filter({ id });
        dispatch({
            type: COURSE_ACTION_TYPES.GET_ONE_COURSE,
            payload: result[0],
        });
    };

// ----------------------------
// CLEAR ACTIVE COURSE
// ----------------------------
export const clearSelectedCourse =
    () => async (dispatch: Dispatch<CourseActionTypes>) => {
        dispatch({
            type: COURSE_ACTION_TYPES.CLEAR_SELECTED_COURSE,
        });
    };
