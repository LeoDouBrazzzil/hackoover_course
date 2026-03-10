import { Clock, Check } from "lucide-react";

import {
    LessonCard,
    LessonIndex,
    LessonContent,
    LessonTitle,
    LessonMeta,
    LessonDuration,
    LessonStatus,
} from "./LessonItem.styles";

interface Props {
    lesson: any;
    isCompleted: boolean;
    onClick: () => void;
    index: number;
}

export default function LessonItem({ lesson, isCompleted, onClick, index }: Props) {
    return (
        <LessonCard
            $completed={isCompleted}
            onClick={onClick}
            style={{ animationDelay: `${index * 0.04}s` }}
        >
            {/* Index badge */}
            <LessonIndex $completed={isCompleted}>
                {index + 1}
            </LessonIndex>

            {/* Content */}
            <LessonContent>
                <LessonTitle $completed={isCompleted}>
                    {lesson.title}
                    caca
                </LessonTitle>

                {lesson.duration_minutes && (
                    <LessonMeta>
                        <LessonDuration>
                            <Clock />
                            {lesson.duration_minutes} min
                        </LessonDuration>
                    </LessonMeta>
                )}
            </LessonContent>

            {/* Status */}
            <LessonStatus $completed={isCompleted}>
                {isCompleted ? <Check /> : null}
            </LessonStatus>
        </LessonCard>
    );
}
