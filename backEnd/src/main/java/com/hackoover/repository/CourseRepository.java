package com.hackoover.repository;

import com.hackoover.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    List<Course> findByIsFeaturedTrue();
    List<Course> findByCategory(String category);
    List<Course> findByLevel(String level);
}
