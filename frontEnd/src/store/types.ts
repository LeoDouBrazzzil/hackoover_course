import type { ProgressState } from "./user/user.types"
import type { LessonState } from "./lesson/lesson.types"
import type { CourseState } from "./course/course.types"

export type RootState = {
    user: ProgressState
    course: CourseState
    lesson: LessonState
}

