import type { CourseState, CourseActionTypes } from "./course.types";
import { COURSE_ACTION_TYPES } from "./course.types";

const initialState: CourseState = {
    list: [],
    featured: [],
    selected: null,
};

const courseReducer = (
    state: CourseState = initialState,
    action: CourseActionTypes
): CourseState => {
    switch (action.type) {
        case COURSE_ACTION_TYPES.GET_COURSES:
            return { ...state, list: action.payload };

        case COURSE_ACTION_TYPES.GET_FEATURED:
            return { ...state, featured: action.payload };

        case COURSE_ACTION_TYPES.GET_ONE_COURSE:
            return { ...state, selected: action.payload };

        case COURSE_ACTION_TYPES.CLEAR_SELECTED_COURSE:
            return { ...state, selected: null };

        default:
            return state;
    }
};

export default courseReducer;
