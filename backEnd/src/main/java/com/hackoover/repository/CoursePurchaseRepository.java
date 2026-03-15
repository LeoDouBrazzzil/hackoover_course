package com.hackoover.repository;

import com.hackoover.model.CoursePurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CoursePurchaseRepository extends JpaRepository<CoursePurchase, UUID> {

    boolean existsByUserIdAndCourseId(UUID userId, UUID courseId);

    @Query("SELECT cp.course.id FROM CoursePurchase cp WHERE cp.user.id = :userId")
    List<UUID> findCourseIdsByUserId(@Param("userId") UUID userId);
}
