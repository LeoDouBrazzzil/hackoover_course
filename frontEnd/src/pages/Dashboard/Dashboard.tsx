import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useIntl } from "react-intl";
import {
    BookOpen, CheckCircle, Clock, TrendingUp,
    ArrowRight, LogOut, Zap, User,
} from "lucide-react";

import api, { clearAccessToken } from "api/api.ts";
import { useAccess } from "utils/useAccess.ts";

import {
    Page, HeroRow, AvatarCircle, HeroMeta, HeroName, HeroBadge, HeroSub,
    StatsGrid, StatCard, StatIcon, StatValue, StatLabel,
    Body, Panel, PanelTitle,
    FieldGroup, FieldWrap, FieldLabel, Input, SaveButton, Divider, DangerZone, DangerLabel, LogoutButton,
    CourseList, CourseRow, CourseThumb, CourseInfo, CourseTitle,
    ProgressRow, ProgressTrack, ProgressFill, ProgressPct, CourseArrow,
    EmptyBlock,
} from "./Dashboard.styles";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function initials(name: string) {
    return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function formatJoinDate(dateStr?: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Dashboard() {
    const navigate = useNavigate();
    const { hasSubscription } = useAccess();
    const intl = useIntl();

    // ── User ──
    const [user, setUser] = useState<any>(null);
    const [form, setForm] = useState({ firstName: "", lastName: "", username: "" });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        api.auth.me().then(u => {
            setUser(u);
            setForm({
                firstName: u.firstName ?? "",
                lastName:  u.lastName  ?? "",
                username:  u.username  ?? "",
            });
        }).catch(() => setUser(null));
    }, []);

    // ── Data ──
    const { data: allCourses  = [] } = useQuery({ queryKey: ["all-courses"],  queryFn: () => api.entities.Course.list(), initialData: [] });
    const { data: allLessons  = [] } = useQuery({ queryKey: ["all-lessons"],  queryFn: () => api.entities.Lesson.list(), initialData: [] });
    const { data: userProgress = [] } = useQuery({
        queryKey: ["all-user-progress", user?.email],
        queryFn:  () => api.entities.UserProgress.filter({ user_email: user?.email }),
        initialData: [],
        enabled: !!user,
    });

    // ── Stats ──
    const coursesArray  = Array.isArray(allCourses)   ? allCourses   : [];
    const lessonsArray  = Array.isArray(allLessons)   ? allLessons   : [];
    const progressArray = Array.isArray(userProgress) ? userProgress : [];

    const enrolledCourseIds = [...new Set(progressArray.map((p: any) => p.course_id))];
    const enrolledCourses   = coursesArray.filter((c: any) => enrolledCourseIds.includes(c.id));
    const completedLessons  = progressArray.filter((p: any) => p.completed).length;
    const totalLessons      = lessonsArray.filter((l: any) => enrolledCourseIds.includes(l.course_id)).length;
    const overallProgress   = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const studyHours        = Math.round(completedLessons * 45 / 60);

    const displayName = user
        ? (user.firstName
            ? `${user.firstName} ${user.lastName ?? ""}`.trim()
            : user.username || (user.email?.split("@")[0] ?? "Utilisateur"))
        : "…";

    // ── Actions ──
    const handleSave = async () => {
        setSaving(true);
        try {
            await api.auth.updateProfile(form);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
            setUser((u: any) => ({ ...u, ...form }));
        } catch {
            // no-op
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        clearAccessToken();
        navigate("/login");
    };

    if (!user) {
        return (
            <Page>
                <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af", fontSize: 14 }}>
                    {intl.formatMessage({ id: "dashboard.loading" })}
                </div>
            </Page>
        );
    }

    const stats = [
        { icon: BookOpen,    value: enrolledCourses.length, label: intl.formatMessage({ id: "dashboard.stat.courses" })  },
        { icon: CheckCircle, value: completedLessons,        label: intl.formatMessage({ id: "dashboard.stat.lessons" })  },
        { icon: Clock,       value: `${studyHours}h`,        label: intl.formatMessage({ id: "dashboard.stat.hours" })    },
        { icon: TrendingUp,  value: `${overallProgress}%`,   label: intl.formatMessage({ id: "dashboard.stat.progress" }) },
    ];

    return (
        <Page>
            {/* ── Hero ── */}
            <HeroRow>
                <AvatarCircle>{initials(displayName)}</AvatarCircle>
                <HeroMeta>
                    <HeroName>{intl.formatMessage({ id: "dashboard.greeting" }, { name: displayName.split(" ")[0] })}</HeroName>
                    <HeroBadge $premium={hasSubscription}>
                        {hasSubscription ? <><Zap size={10} /> {intl.formatMessage({ id: "dashboard.badge.premium" })}</> : <><User size={10} /> {intl.formatMessage({ id: "dashboard.badge.free" })}</>}
                    </HeroBadge>
                    {user.createdAt && (
                        <HeroSub>{intl.formatMessage({ id: "dashboard.member_since" }, { date: formatJoinDate(user.createdAt) })}</HeroSub>
                    )}
                </HeroMeta>
            </HeroRow>

            {/* ── Stats ── */}
            <StatsGrid>
                {stats.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                    >
                        <StatCard>
                            <StatIcon><s.icon /></StatIcon>
                            <StatValue>{s.value}</StatValue>
                            <StatLabel>{s.label}</StatLabel>
                        </StatCard>
                    </motion.div>
                ))}
            </StatsGrid>

            {/* ── Body ── */}
            <Body>

                {/* ── Left: Profile form ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
                >
                    <Panel>
                        <PanelTitle>{intl.formatMessage({ id: "dashboard.profile.title" })}</PanelTitle>

                        <FieldGroup>
                            <FieldWrap>
                                <FieldLabel>{intl.formatMessage({ id: "dashboard.profile.first_name" })}</FieldLabel>
                                <Input
                                    value={form.firstName}
                                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                                    placeholder={intl.formatMessage({ id: "dashboard.profile.first_name.placeholder" })}
                                />
                            </FieldWrap>
                            <FieldWrap>
                                <FieldLabel>{intl.formatMessage({ id: "dashboard.profile.last_name" })}</FieldLabel>
                                <Input
                                    value={form.lastName}
                                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                                    placeholder={intl.formatMessage({ id: "dashboard.profile.last_name.placeholder" })}
                                />
                            </FieldWrap>
                            <FieldWrap>
                                <FieldLabel>{intl.formatMessage({ id: "dashboard.profile.username" })}</FieldLabel>
                                <Input
                                    value={form.username}
                                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                                    placeholder={intl.formatMessage({ id: "dashboard.profile.username.placeholder" })}
                                />
                            </FieldWrap>
                            <FieldWrap>
                                <FieldLabel>{intl.formatMessage({ id: "dashboard.profile.email" })}</FieldLabel>
                                <Input
                                    value={user.email ?? ""}
                                    readOnly
                                    style={{ opacity: 0.55, cursor: "not-allowed" }}
                                />
                            </FieldWrap>
                        </FieldGroup>

                        <SaveButton
                            onClick={handleSave}
                            disabled={saving || saved}
                            $saving={saving}
                            $saved={saved}
                            style={{ marginTop: 20 }}
                        >
                            {saved ? intl.formatMessage({ id: "dashboard.profile.saved" }) : saving ? intl.formatMessage({ id: "dashboard.profile.saving" }) : intl.formatMessage({ id: "dashboard.profile.save" })}
                        </SaveButton>

                        <Divider />

                        {!hasSubscription && (
                            <>
                                <div
                                    onClick={() => navigate("/tarifs")}
                                    style={{
                                        background: "#0a0a0a",
                                        borderRadius: 14,
                                        padding: "16px 18px",
                                        cursor: "pointer",
                                        marginBottom: 16,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 12,
                                        transition: "opacity 0.15s",
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                                >
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                                            {intl.formatMessage({ id: "dashboard.upsell.title" })}
                                        </div>
                                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>
                                            {intl.formatMessage({ id: "dashboard.upsell.sub" })}
                                        </div>
                                    </div>
                                    <Zap size={16} color="#22c55e" />
                                </div>
                            </>
                        )}

                        <DangerZone>
                            <DangerLabel>{intl.formatMessage({ id: "dashboard.session.label" })}</DangerLabel>
                            <LogoutButton onClick={handleLogout}>
                                <LogOut size={14} /> {intl.formatMessage({ id: "dashboard.logout" })}
                            </LogoutButton>
                        </DangerZone>
                    </Panel>
                </motion.div>

                {/* ── Right: Courses in progress ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.32, ease: EASE }}
                >
                    <Panel>
                        <PanelTitle>{intl.formatMessage({ id: "dashboard.my_courses" }, { count: enrolledCourses.length })}</PanelTitle>

                        {enrolledCourses.length > 0 ? (
                            <CourseList>
                                {enrolledCourses.map((course: any) => {
                                    const cLessons  = lessonsArray.filter((l: any) => l.course_id === course.id);
                                    const cProgress = progressArray.filter((p: any) => p.course_id === course.id && p.completed);
                                    const pct = cLessons.length > 0 ? Math.round((cProgress.length / cLessons.length) * 100) : 0;

                                    return (
                                        <CourseRow
                                            key={course.id}
                                            onClick={() => navigate(`/course-detail?id=${course.id}`)}
                                        >
                                            <CourseThumb>
                                                {course.image_url
                                                    ? <img src={course.image_url} alt={course.title} />
                                                    : <BookOpen />
                                                }
                                            </CourseThumb>

                                            <CourseInfo>
                                                <CourseTitle>{course.title}</CourseTitle>
                                                <ProgressRow>
                                                    <ProgressTrack>
                                                        <ProgressFill $pct={pct} />
                                                    </ProgressTrack>
                                                    <ProgressPct>{pct}%</ProgressPct>
                                                </ProgressRow>
                                            </CourseInfo>

                                            <CourseArrow><ArrowRight size={14} /></CourseArrow>
                                        </CourseRow>
                                    );
                                })}
                            </CourseList>
                        ) : (
                            <EmptyBlock>
                                <BookOpen />
                                <strong>{intl.formatMessage({ id: "dashboard.empty.title" })}</strong>
                                <span
                                    style={{ cursor: "pointer", color: "#6b7280", textDecoration: "underline" }}
                                    onClick={() => navigate("/courses")}
                                >
                                    {intl.formatMessage({ id: "dashboard.empty.cta" })}
                                </span>
                            </EmptyBlock>
                        )}
                    </Panel>
                </motion.div>

            </Body>
        </Page>
    );
}
