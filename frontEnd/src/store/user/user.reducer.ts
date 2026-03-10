import {PROGRESS_ACTION_TYPES, type ProgressActionTypes, type ProgressState} from "store/user/user.types.ts";


const initialState: ProgressState = {
    all: [],
    byCourse: [],
};

const progressReducer = (
    state: ProgressState = initialState,
    action: ProgressActionTypes
): ProgressState => {
    switch (action.type) {
        case PROGRESS_ACTION_TYPES.GET_ALL_PROGRESS:
            return { ...state, all: action.payload };

        case PROGRESS_ACTION_TYPES.GET_PROGRESS_FOR_COURSE:
            return { ...state, byCourse: action.payload };

        case PROGRESS_ACTION_TYPES.UPDATE_PROGRESS:
            return {
                ...state,
                all: [...state.all.filter(p => p.id !== action.payload.id), action.payload],
                byCourse: [
                    ...state.byCourse.filter(p => p.id !== action.payload.id),
                    action.payload,
                ],
            };

        case PROGRESS_ACTION_TYPES.CLEAR_PROGRESS:
            return { ...state, all: [], byCourse: [] };

        default:
            return state;
    }
};

export default progressReducer;
