import { Link } from "react-router-dom";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

import {
    CardWrapper,
    CardImage,
    CardImagePlaceholder,
    CardBody,
    CardMeta,
    CardCategory,
    LevelBadge,
    CardTitle,
    CardDescription,
    CardFooter,
    CardDuration,
    CardCTA,
} from "components/courses/CourseCard/CourseCard.styles.tsx";

export default function CourseCard({ course }: { course: any }) {
    return (
        <Link to={`/course-detail?id=${course.id}`} style={{ textDecoration: "none", display: "flex", height: "100%" }}>
            <CardWrapper>

                {/* ── Image ── */}
                <CardImage>
                    {course.image_url ? (
                        <img src={course.image_url} alt={course.title} />
                    ) : (
                        <CardImagePlaceholder>
                            <BookOpen />
                        </CardImagePlaceholder>
                    )}
                </CardImage>

                {/* ── Body ── */}
                <CardBody>
                    <CardMeta>
                        <CardCategory>
                            {(course.category ?? "").replace(/_/g, " ")}
                        </CardCategory>
                        {course.level && (
                            <LevelBadge $level={course.level}>
                                {course.level}
                            </LevelBadge>
                        )}
                    </CardMeta>

                    <CardTitle>{course.title}</CardTitle>

                    {course.description && (
                        <CardDescription>{course.description}</CardDescription>
                    )}

                    {/* ── Footer ── */}
                    <CardFooter>
                        <CardDuration>
                            {course.duration_hours ? (
                                <>
                                    <Clock />
                                    {course.duration_hours}h
                                </>
                            ) : null}
                        </CardDuration>

                        <CardCTA>
                            Commencer <ArrowRight />
                        </CardCTA>
                    </CardFooter>
                </CardBody>

            </CardWrapper>
        </Link>
    );
}
