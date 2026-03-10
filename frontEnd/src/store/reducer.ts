import {combineReducers} from "redux"
import user from "./user/user.reducer"
import type { ProgressState } from "./user/user.types"
import lesson from "./lesson/lesson.reducer"
import type { LessonState } from "./lesson/lesson.types"
import course from "./course/course.reducer"
import type { CourseState } from "./course/course.types"


export type State = {
    user: ProgressState
    lesson: LessonState
    course: CourseState

}

const reducer = combineReducers({
    user,
    lesson,
    course

})

export default reducer
