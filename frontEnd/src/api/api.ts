import axios from "axios";
import qs from "qs";
import * as ENV from "config/env";
import endpoints from "./endpoint";

import type {
    Course,
    CourseListResponse,
    CourseFeaturedResponse,
    LessonListResponse,
    UserProgress,
    UserProgressListResponse,
} from "store/types/api.types";

// ------------------------------------
// AXIOS INSTANCES
// ------------------------------------

// Instance authentifiée — envoie le token, redirige sur 401
const ws = axios.create({
    baseURL: ENV.API_BASE_URL,
    withCredentials: false,
    timeout: 60000,
    maxRedirects: 0,
});

// Instance publique — pas de token, pas de redirection sur 401
const publicWs = axios.create({
    baseURL: ENV.API_BASE_URL,
    withCredentials: false,
    timeout: 60000,
    maxRedirects: 0,
});

// ------------------------------------
// TOKEN STORAGE (JWT)
// ------------------------------------

export const getAccessToken = () => {
    return localStorage.getItem("token");
};

export const setAccessToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const clearAccessToken = () => {
    localStorage.removeItem("token");
};

// ------------------------------------
// PARAM SERIALIZER
// ------------------------------------

const paramsSerializer = (params: Record<string, any>) =>
    qs.stringify(params, { arrayFormat: "repeat", encode: true });

// ------------------------------------
// REQUEST INTERCEPTOR — instance privée uniquement
// ------------------------------------

ws.interceptors.request.use((request) => {
    const token = getAccessToken();

    if (token && request.headers) {
        request.headers["Authorization"] = `Bearer ${token}`;
    }

    if (request.headers) {
        request.headers["x-agent"] = "WEB";
    }

    return request;
});

// ------------------------------------
// RESPONSE INTERCEPTOR — instance privée uniquement
// ------------------------------------

ws.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized - redirecting to login");
            clearAccessToken();
            window.location.href = "/login";
        }

        console.error("API ERROR:", error);
        return Promise.reject(error);
    }
);

// ------------------------------------
// RESPONSE INTERCEPTOR — instance publique (log seul, pas de redirect)
// ------------------------------------

publicWs.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("PUBLIC API ERROR:", error);
        return Promise.reject(error);
    }
);

// ------------------------------------
// API STRUCTURE
// ------------------------------------

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface LoginRequest {
    emailOrUsername: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    type?: string;
    userId: string;
    username: string;
    email: string;
    roles: string[];
    message?: string;
}

// ------------------------------------
// ADMIN TYPES
// ------------------------------------

export interface CourseRequest {
    title: string;
    description: string;
    imageUrl?: string;
    difficulty: string;
    duration?: number;
    featured?: boolean;
    category: string;
}

export interface LessonRequest {
    courseId: string;
    title: string;
    content: string;
    orderIndex: number;
    duration?: number;
    videoUrl?: string;
}

export interface CourseResponse {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    difficulty: string;
    duration?: number;
    featured: boolean;
    category: string;
}

export interface LessonResponse {
    id: string;
    courseId: string;
    title: string;
    content: string;
    orderIndex: number;
    duration?: number;
    videoUrl?: string;
}

const api = {
    auth: {
        async register(payload: RegisterRequest): Promise<AuthResponse> {
            const { data } = await publicWs.post(endpoints.auth.register, payload);
            if (data.token) {
                setAccessToken(data.token);
            }
            return data;
        },

        async login(payload: LoginRequest): Promise<AuthResponse> {
            const { data } = await publicWs.post(endpoints.auth.login, payload);
            if (data.token) {
                setAccessToken(data.token);
            }
            return data;
        },

        async verifyEmail(token: string): Promise<string> {
            const { data } = await publicWs.get(endpoints.auth.verifyEmail, {
                params: { token },
            });
            return data;
        },

        async me() {
            const { data } = await ws.get("/auth/me");
            return data;
        },

        redirectToLogin() {
            window.location.href = "/login";
        },

        logout() {
            clearAccessToken();
            window.location.href = "/";
        },
    },

    entities: {
        Course: {
            // ✅ Public — pas de token requis, pas de redirection
            list(): Promise<CourseListResponse> {
                return publicWs.get(endpoints.course.list).then((r) => r.data);
            },

            // ✅ Public — list() et featured() sont tous les deux publics
            async filter(query: any = {}, limit: number | null = null): Promise<CourseListResponse> {

                if (query.is_featured) {
                    const { data }: { data: CourseFeaturedResponse } =
                        await publicWs.get(endpoints.course.featured);

                    return typeof limit === "number"
                        ? data.slice(0, limit)
                        : data;
                }

                if (query.id) {
                    // 🔒 Détail d'un cours — requiert auth
                    const { data }: { data: Course } =
                        await ws.get(endpoints.course.byId(query.id));

                    return [data];
                }

                return this.list();
            },
        },

        Lesson: {
            // 🔒 Leçons — requiert auth
            list(): Promise<LessonListResponse> {
                return ws.get(endpoints.lesson.list).then((r) => r.data);
            },

            filter(query: any = {}): Promise<LessonListResponse> {
                if (query.course_id) {
                    return ws
                        .get(endpoints.lesson.byCourse(query.course_id))
                        .then((r) => r.data);
                }

                return this.list();
            },
        },

        UserProgress: {
            // 🔒 Progression — requiert auth
            async filter(query: any = {}): Promise<UserProgressListResponse> {

                if (query.user_email && query.course_id) {
                    return ws
                        .get(endpoints.userProgress.byCourseAndUser, {
                            params: {
                                email: query.user_email,
                                courseId: query.course_id,
                            },
                            paramsSerializer,
                        })
                        .then((r) => r.data);
                }

                if (query.user_email) {
                    return ws
                        .get(endpoints.userProgress.byUser, {
                            params: { email: query.user_email },
                            paramsSerializer,
                        })
                        .then((r) => r.data);
                }

                return Promise.resolve([]);
            },

            create(payload: Partial<UserProgress>): Promise<UserProgress> {
                return ws
                    .post(endpoints.userProgress.base, payload)
                    .then((r) => r.data);
            },

            update(payload: Partial<UserProgress>): Promise<UserProgress> {
                return ws
                    .post(endpoints.userProgress.base, payload)
                    .then((r) => r.data);
            },
        },
    },

    // ------------------------------------
    // ADMIN API — 🔒 Requiert ROLE_ADMIN
    // ------------------------------------
    admin: {
        courses: {
            async getAll(): Promise<CourseResponse[]> {
                const { data } = await ws.get('/admin/courses');
                return data;
            },

            async create(payload: CourseRequest): Promise<CourseResponse> {
                const { data } = await ws.post('/admin/courses', payload);
                return data;
            },

            async update(id: string, payload: CourseRequest): Promise<CourseResponse> {
                const { data } = await ws.put(`/admin/courses/${id}`, payload);
                return data;
            },

            async delete(id: string): Promise<void> {
                await ws.delete(`/admin/courses/${id}`);
            },

            async uploadImage(id: string, file: File): Promise<string> {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await ws.post(`/admin/courses/${id}/image`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                return data;
            },
        },

        lessons: {
            async getByCourse(courseId: string): Promise<LessonResponse[]> {
                const { data } = await ws.get(`/admin/lessons/by-course/${courseId}`);
                return data;
            },

            async create(payload: LessonRequest): Promise<LessonResponse> {
                const { data } = await ws.post('/admin/lessons', payload);
                return data;
            },

            async update(id: string, payload: LessonRequest): Promise<LessonResponse> {
                const { data } = await ws.put(`/admin/lessons/${id}`, payload);
                return data;
            },

            async delete(id: string): Promise<void> {
                await ws.delete(`/admin/lessons/${id}`);
            },

            async reorder(courseId: string, lessonIds: string[]): Promise<void> {
                await ws.put('/admin/lessons/reorder', lessonIds, {
                    params: { courseId }
                });
            },
        },
    },
};

export { ws, publicWs };
export default api;
