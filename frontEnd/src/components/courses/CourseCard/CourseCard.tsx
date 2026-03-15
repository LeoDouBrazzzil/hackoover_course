import { useNavigate } from "react-router-dom";
import { Clock, ArrowRight, BookOpen, Lock } from "lucide-react";
import { useIntl } from "react-intl";

import {
    CardWrapper,
    CardImage,
    CardImagePlaceholder,
    CardLockOverlay,
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

interface Props {
    course: any;
    isLocked?: boolean;
}

export default function CourseCard({ course, isLocked = false }: Props) {
    const navigate = useNavigate();
    const intl = useIntl();

    const handleClick = () => {
        if (isLocked) {
            navigate("/tarifs");
        } else {
            navigate(`/course-detail?id=${course.id}`);
        }
    };

    return (
        <CardWrapper onClick={handleClick} $locked={isLocked}>

            {/* ── Image ── */}
            <CardImage>
                {course.image_url ? (
                    <img src={course.image_url} alt={course.title} />
                ) : (
                    <CardImagePlaceholder>
                        <BookOpen />
                    </CardImagePlaceholder>
                )}
                {isLocked && (
                    <CardLockOverlay>
                        <Lock />
                    </CardLockOverlay>
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

                    {isLocked ? (
                        <CardCTA $locked>
                            <Lock size={13} /> {intl.formatMessage({ id: "course_card.price" })}
                        </CardCTA>
                    ) : (
                        <CardCTA>
                            {intl.formatMessage({ id: "course_card.start" })} <ArrowRight size={14} />
                        </CardCTA>
                    )}
                </CardFooter>
            </CardBody>

        </CardWrapper>
    );
}
