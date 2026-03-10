import type { LessonState, LessonActionTypes } from "./lesson.types";
import { LESSON_ACTION_TYPES } from "./lesson.types";

const initialState: LessonState = {
    list: [],
    byCourse: [],
    active: null,
};

const lessonReducer = (
    state: LessonState = initialState,
    action: LessonActionTypes
): LessonState => {
    switch (action.type) {
        case LESSON_ACTION_TYPES.GET_LESSONS:
            return { ...state, list: action.payload };

        case LESSON_ACTION_TYPES.GET_LESSONS_BY_COURSE:
            return { ...state, byCourse: action.payload };

        case LESSON_ACTION_TYPES.GET_ONE_LESSON:
            return { ...state, active: action.payload };

        case LESSON_ACTION_TYPES.CLEAR_ACTIVE_LESSON:
            return { ...state, active: null };

        default:
            return state;
    }
};

export default lessonReducer;
