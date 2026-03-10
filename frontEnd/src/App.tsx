import { Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import Layout from "pages/Layout/Layout.tsx";
import Courses from "pages/Courses/Courses.tsx";
import CourseDetail from "pages/CourseDetails/CourseDetail.tsx";
import Dashboard from "pages/Dashboard/Dashboard.tsx";
import Home from "pages/Home/Home.tsx";


export default function App() {
    return (
        <Routes>
            {/* ── Auth routes — sans navbar ── */}
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* ── App routes — avec Layout + navbar ── */}
            <Route element={<Layout><Courses /></Layout>}     path="/courses" />
            <Route element={<Layout><CourseDetail /></Layout>} path="/course-detail" />
            <Route element={<Layout><Dashboard /></Layout>}   path="/dashboard" />
            <Route element={<Layout><Home /></Layout>}        path="/" />
        </Routes>
    );
}
