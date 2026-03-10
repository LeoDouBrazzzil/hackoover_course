package com.hackoover.repository;

import com.hackoover.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface UserProgressRepository extends JpaRepository<UserProgress, UUID> {
    List<UserProgress> findByUser_email(String email);
    List<UserProgress> findByCourse_id(UUID courseId);
    List<UserProgress> findByCourse_idAndUser_email(UUID courseId, String email);
    UserProgress findByUserEmailAndLessonId(String email, UUID lessonId);
}
