package com.hackoover.repository;

import com.hackoover.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface LessonRepository extends JpaRepository<Lesson, UUID> {
    List<Lesson> findByCourseIdOrderByOrder(UUID courseId);
    List<Lesson> findByCourse_id(UUID courseId);
}
