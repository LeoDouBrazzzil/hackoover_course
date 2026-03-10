package com.hackoover.service;

import com.hackoover.dto.LessonRequest;
import com.hackoover.model.Course;
import com.hackoover.model.Lesson;
import com.hackoover.repository.CourseRepository;
import com.hackoover.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository repo;
    private final CourseRepository courseRepository;

    public List<Lesson> findByCourse(UUID courseId){
        if(courseId==null) return repo.findAll();
        return repo.findByCourseIdOrderByOrder(courseId);
    }
    public Lesson save(Lesson l){ return repo.save(l); }

    // Admin methods
    public List<Lesson> getLessonsByCourse(UUID courseId) {
        return repo.findByCourseIdOrderByOrder(courseId);
    }

    public Lesson createLesson(LessonRequest request) {
        Course course = courseRepository.findById(UUID.fromString(request.getCourseId()))
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Lesson lesson = new Lesson();
        lesson.setCourse(course);
        lesson.setTitle(request.getTitle());
        lesson.setContent(request.getContent());
        lesson.setOrder(request.getOrderIndex());
        lesson.setDuration_minutes(request.getDuration());
        lesson.setVideo_url(request.getVideoUrl());

        return repo.save(lesson);
    }

    public Lesson updateLesson(UUID id, LessonRequest request) {
        Lesson lesson = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        lesson.setTitle(request.getTitle());
        lesson.setContent(request.getContent());
        lesson.setOrder(request.getOrderIndex());
        lesson.setDuration_minutes(request.getDuration());
        lesson.setVideo_url(request.getVideoUrl());

        return repo.save(lesson);
    }

    public void deleteLesson(UUID id) {
        repo.deleteById(id);
    }

    public void reorderLessons(UUID courseId, List<UUID> lessonIds) {
        for (int i = 0; i < lessonIds.size(); i++) {
            Lesson lesson = repo.findById(lessonIds.get(i))
                    .orElseThrow(() -> new RuntimeException("Lesson not found"));
            lesson.setOrder(i);
            repo.save(lesson);
        }
    }
}
