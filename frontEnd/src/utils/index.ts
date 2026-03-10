export function createPageUrl(name: string) {
    switch(name) {
        case "Home": return "/";
        case "Courses": return "/courses";
        case "Dashboard": return "/dashboard";
        case "CourseDetail": return "/course-detail";
        default: return "/";
    }
}
