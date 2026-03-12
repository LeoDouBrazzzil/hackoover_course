package com.hackoover.controller;

import com.hackoover.dto.CourseRequest;
import com.hackoover.dto.CourseResponse;
import com.hackoover.model.Course;
import com.hackoover.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminCourseController {

    private final CourseService courseService;

    /**
     * Créer un nouveau cours
     */
    @PostMapping
    public ResponseEntity<CourseResponse> createCourse(
            @Valid @RequestBody CourseRequest request
    ) {
        Course course = courseService.createCourse(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToResponse(course));
    }

    /**
     * Mettre à jour un cours existant
     */
    @PutMapping("/{id}")
    public ResponseEntity<CourseResponse> updateCourse(
            @PathVariable UUID id,
            @Valid @RequestBody CourseRequest request
    ) {
        Course course = courseService.updateCourse(id, request);
        return ResponseEntity.ok(mapToResponse(course));
    }

    /**
     * Supprimer un cours
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable UUID id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Uploader une image pour un cours
     */
    @PostMapping("/{id}/image")
    public ResponseEntity<String> uploadCourseImage(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        String imageUrl = courseService.uploadCourseImage(id, file);
        return ResponseEntity.ok(imageUrl);
    }

    /**
     * Get all courses (pour l'admin)
     */
    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAllCoursesAdmin() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses.stream().map(this::mapToResponse).toList());
    }

    private CourseResponse mapToResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId().toString())
                .title(course.getTitle())
                .description(course.getDescription())
                .imageUrl(course.getImage_url())
                .difficulty(course.getLevel())
                .duration(course.getDuration_hours())
                .featured(course.getFeatured())
                .category(course.getCategory())
                .build();
    }
}
