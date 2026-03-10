// -----------------------------
// COURSE MODEL
// -----------------------------
export interface Course {
    id: string;
    title: string;
    description: string;
    level: string;
    category: string;
    duration_hours: number | null;
    image_url: string | null;
    isFeatured: boolean;
    enrolled_count: number;
}

// -----------------------------
// LESSON MODEL
// -----------------------------
export interface Lesson {
    id: string;
    course: Course;              // full nested object (Spring returns object)
    title: string;
    content: string;
    chapter: string | null;
    order: number;
    duration_minutes: number | null;
    video_url: string | null;
}

// -----------------------------
// USER MODEL (minimal)
// -----------------------------
export interface User {
    id: string;
    email: string;
    full_name: string | null;
}

// -----------------------------
// USER PROGRESS
// -----------------------------
export interface UserProgress {
    id: string;
    user: User;
    lesson: Lesson;
    course: Course;
    completed: boolean;
    completed_date: string | null; // ISO date string
}

// -----------------------------
// API RESPONSE TYPES
// -----------------------------
export type CourseListResponse = Course[];
export type CourseFeaturedResponse = Course[];
export type LessonListResponse = Lesson[];

export type UserProgressListResponse = UserProgress[];
