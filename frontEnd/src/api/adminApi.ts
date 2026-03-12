import axios from 'axios';

const API_URL = '/api/admin';

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

// =============== COURSES ===============
export const getAllCoursesAdmin = async (): Promise<CourseResponse[]> => {
  const response = await axios.get(`${API_URL}/courses`);
  return response.data;
};

export const createCourse = async (data: CourseRequest): Promise<CourseResponse> => {
  const response = await axios.post(`${API_URL}/courses`, data);
  return response.data;
};

export const updateCourse = async (id: string, data: CourseRequest): Promise<CourseResponse> => {
  const response = await axios.put(`${API_URL}/courses/${id}`, data);
  return response.data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/courses/${id}`);
};

export const uploadCourseImage = async (id: string, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/courses/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// =============== LESSONS ===============
export const getLessonsByCourse = async (courseId: string): Promise<LessonResponse[]> => {
  const response = await axios.get(`${API_URL}/lessons/by-course/${courseId}`);
  return response.data;
};

export const createLesson = async (data: LessonRequest): Promise<LessonResponse> => {
  const response = await axios.post(`${API_URL}/lessons`, data);
  return response.data;
};

export const updateLesson = async (id: string, data: LessonRequest): Promise<LessonResponse> => {
  const response = await axios.put(`${API_URL}/lessons/${id}`, data);
  return response.data;
};

export const deleteLesson = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/lessons/${id}`);
};

export const reorderLessons = async (courseId: string, lessonIds: string[]): Promise<void> => {
  await axios.put(`${API_URL}/lessons/reorder`, lessonIds, {
    params: { courseId }
  });
};
