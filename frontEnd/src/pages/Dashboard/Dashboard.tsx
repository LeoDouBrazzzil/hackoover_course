import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "api/api";
import { Link } from "react-router-dom";
import {Card, DashboardContainer, StatsGrid} from "pages/Dashboard/Dashboard.styles.tsx";

export default function Dashboard(){
    const [user,setUser] = useState<any>(null);
    useEffect(()=>{ api.auth.me().then(setUser).catch(()=>setUser(null)) },[]);

    const { data: allCourses = [] } = useQuery({ queryKey:['all-courses'], queryFn: ()=> api.entities.Course.list(), initialData: [] });
    const { data: userProgress = [] } = useQuery({ queryKey:['all-user-progress', user?.email], queryFn: ()=> api.entities.UserProgress.filter({ user_email: user?.email }), initialData: [], enabled: !!user });
    const { data: allLessons = [] } = useQuery({ queryKey:['all-lessons'], queryFn: ()=> api.entities.Lesson.list(), initialData: [] });

    if(!user) return <div style={{padding:40,textAlign:'center'}}>Chargement...</div>;

    const coursesArray = Array.isArray(allCourses) ? allCourses : [];
    const progressArray = Array.isArray(userProgress) ? userProgress : [];
    const lessonsArray = Array.isArray(allLessons) ? allLessons : [];

    const enrolledCourseIds = [...new Set(progressArray.map((p:any)=>p.course_id))];
    const enrolledCourses = coursesArray.filter((c:any)=> enrolledCourseIds.includes(c.id));
    const completedLessons = progressArray.filter((p:any)=>p.completed).length;
    const totalLessons = lessonsArray.filter((l:any)=> enrolledCourseIds.includes(l.course_id)).length;
    const overallProgress = totalLessons>0 ? (completedLessons/totalLessons)*100 : 0;

    const displayName = user.firstName
        ? `${user.firstName} ${user.lastName || ''}`.trim()
        : user.username || (user.email ? user.email.split('@')[0] : 'Utilisateur');

    return (
        <DashboardContainer>
            <h1>Bienvenue, {displayName}</h1>
            <StatsGrid>
                <Card><div className="small">Cours en cours</div><div style={{fontWeight:700,fontSize:20}}>{enrolledCourses.length}</div></Card>
                <Card><div className="small">Leçons complétées</div><div style={{fontWeight:700,fontSize:20}}>{completedLessons}</div></Card>
                <Card><div className="small">Temps d'étude</div><div style={{fontWeight:700,fontSize:20}}>{Math.round(completedLessons*45/60)}h</div></Card>
                <Card><div className="small">Progression</div><div style={{fontWeight:700,fontSize:20}}>{Math.round(overallProgress)}%</div></Card>
            </StatsGrid>

            <div style={{marginTop:20}}>
                <h2>Mes cours en cours</h2>
                {enrolledCourses.length>0 ? (
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12, marginTop:12}}>
                        {enrolledCourses.map((course:any)=>{
                            const courseLessons = lessonsArray.filter((l:any)=> l.course_id===course.id)
                            const courseProgress = progressArray.filter((p:any)=> p.course_id===course.id && p.completed)
                            const progressPercentage = courseLessons.length>0 ? (courseProgress.length/courseLessons.length)*100 : 0
                            return (
                                <Link key={course.id} to={'/course-detail?id='+course.id} style={{display:'block',textDecoration:'none'}} >
                                    <div style={{background:'#fff',border:'1px solid #e5e7eb',padding:12,borderRadius:8}}>
                                        <div style={{fontWeight:700}}>{course.title}</div>
                                        <div style={{marginTop:8}}>Progression: {Math.round(progressPercentage)}%</div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) : <div style={{padding:20,background:'#fff',border:'1px dashed #e5e7eb',borderRadius:8,textAlign:'center'}}>Aucun cours commencé</div>}
            </div>
        </DashboardContainer>
    );
}
