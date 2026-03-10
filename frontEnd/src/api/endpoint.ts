export default {
    auth: {
        register: "/auth/register",
        login: "/auth/login",
        verifyEmail: "/auth/verify-email",
    },

    course: {
        list: "/courses",
        featured: "/courses/featured",
        byId: (id: string) => `/courses/${id}`,
    },

    lesson: {
        list: "/lessons",
        byCourse: (courseId: string) => `/lessons/by-course/${courseId}`,
    },

    userProgress: {
        base: "/user-progress",
        byCourseAndUser: "/user-progress/by-course-and-user",
        byUser: "/user-progress/by-user",
    },

}
