import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "api/api";
import ReactMarkdown from "react-markdown";
import {DetailContainer, DetailGrid, LessonsList} from "pages/CourseDetails/CourseDetail.styles.tsx";
import LessonItem from "components/courses/LessonItem/LessonItem.tsx";


export default function CourseDetail(){
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");
    const [user,setUser] = useState<any>(null);
    const [selectedLesson,setSelectedLesson] = useState<any>(null);
    const queryClient = useQueryClient();

    useEffect(()=>{ api.auth.me().then(setUser).catch(()=>setUser(null)) },[]);

    const { data: course } = useQuery({ queryKey:["course",courseId], queryFn: async ()=> { const res = await api.entities.Course.filter({ id: courseId }); return res[0]; }, enabled: !!courseId });

    const { data: lessons = [] } = useQuery({ queryKey:["lessons",courseId], queryFn: ()=> api.entities.Lesson.filter({ course_id: courseId }), initialData: [], enabled: !!courseId });

    const { data: userProgress = [] } = useQuery({ queryKey:["user-progress", courseId, user?.email], queryFn: ()=> api.entities.UserProgress.filter({ course_id: courseId, user_email: user?.email }), initialData: [], enabled: !!courseId && !!user });

    const completeMutation = useMutation({
        mutationFn: async (lessonId:string) => {
            const existing = userProgress.find((p:any)=>p.lesson_id===lessonId)
            if(existing) {
                return api.entities.UserProgress.update(existing.id, { ...existing, completed: true, completed_date: new Date().toISOString() })
            } else {
                return api.entities.UserProgress.create({ user: user.email, lesson: lessons[0], course: course, completed: true, completed_date: new Date().toISOString() })
            }
        },
        onSuccess: ()=> queryClient.invalidateQueries({queryKey: ['user-progress']})
    });

    const isCompleted = (lessonId:string) => userProgress.some((p:any)=>p.lesson_id===lessonId && p.completed);

    return (
        <DetailContainer>
            {!course ? <div style={{height:200,background:'#f3f4f6',borderRadius:8}} /> :
                <div>
                    <h1>{course.title}</h1>
                    <DetailGrid>
                        <div>
                            <ReactMarkdown>{course.description || ""}</ReactMarkdown>
                        </div>
                        <div>
                            <h3>Leçons</h3>
                            <LessonsList>
                                {lessons.map((lesson:any,idx:number)=>(
                                    <LessonItem key={lesson.id} lesson={lesson} isCompleted={isCompleted(lesson.id)} onClick={()=>setSelectedLesson(lesson)} index={idx} />
                                ))}
                            </LessonsList>

                            <div style={{marginTop:12}}>
                                <button style={{padding:'10px 14px',background:'#000',color:'#fff',borderRadius:8}} onClick={()=>{ if(selectedLesson && user) completeMutation.mutate(selectedLesson.id) }}>Marquer comme complétée</button>
                            </div>
                        </div>
                    </DetailGrid>
                </div>
            }
        </DetailContainer>
    );
}
