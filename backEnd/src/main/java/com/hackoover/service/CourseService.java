package com.hackoover.service;

import com.hackoover.dto.CourseRequest;
import com.hackoover.model.Course;
import com.hackoover.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository repo;

    private static final String UPLOAD_DIR = "uploads/courses/";

    public List<Course> listAll(){ return repo.findAll(); }
    public List<Course> featured(){ return repo.findByIsFeaturedTrue(); }
    public Course get(UUID id){ return repo.findById(id).orElse(null); }
    public Course save(Course c){ return repo.save(c); }

    // Admin methods
    public List<Course> getAllCourses() {
        return repo.findAll();
    }

    public Course createCourse(CourseRequest request) {
        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setImage_url(request.getImageUrl());
        course.setLevel(request.getDifficulty());
        course.setDuration_hours(request.getDuration());
        course.setFeatured(request.getFeatured() != null ? request.getFeatured() : false);
        course.setCategory(request.getCategory());
        course.setEnrolled_count(0);
        return repo.save(course);
    }

    public Course updateCourse(UUID id, CourseRequest request) {
        Course course = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        if (request.getImageUrl() != null) {
            course.setImage_url(request.getImageUrl());
        }
        course.setLevel(request.getDifficulty());
        course.setDuration_hours(request.getDuration());
        course.setFeatured(request.getFeatured() != null ? request.getFeatured() : false);
        course.setCategory(request.getCategory());

        return repo.save(course);
    }

    public void deleteCourse(UUID id) {
        repo.deleteById(id);
    }

    public String uploadCourseImage(UUID id, MultipartFile file) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null && originalFilename.contains(".")
            ? originalFilename.substring(originalFilename.lastIndexOf("."))
            : "";
        String filename = "course_" + id + "_" + System.currentTimeMillis() + extension;

        // Save file
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return URL
        String imageUrl = "/" + UPLOAD_DIR + filename;

        // Update course
        Course course = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setImage_url(imageUrl);
        repo.save(course);

        return imageUrl;
    }
}
