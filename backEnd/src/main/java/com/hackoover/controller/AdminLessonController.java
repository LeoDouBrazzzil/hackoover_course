package com.hackoover.controller;

import com.hackoover.dto.LessonRequest;
import com.hackoover.dto.LessonResponse;
import com.hackoover.model.Lesson;
import com.hackoover.service.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/lessons")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminLessonController {

    private final LessonService lessonService;

    /**
     * Créer une nouvelle leçon
     */
    @PostMapping
    public ResponseEntity<LessonResponse> createLesson(
            @Valid @RequestBody LessonRequest request
    ) {
        Lesson lesson = lessonService.createLesson(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToResponse(lesson));
    }

    /**
     * Mettre à jour une leçon
     */
    @PutMapping("/{id}")
    public ResponseEntity<LessonResponse> updateLesson(
            @PathVariable UUID id,
            @Valid @RequestBody LessonRequest request
    ) {
        Lesson lesson = lessonService.updateLesson(id, request);
        return ResponseEntity.ok(mapToResponse(lesson));
    }

    /**
     * Supprimer une leçon
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable UUID id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Réordonner les leçons d'un cours
     */
    @PutMapping("/reorder")
    public ResponseEntity<Void> reorderLessons(
            @RequestParam UUID courseId,
            @RequestBody List<UUID> lessonIds
    ) {
        lessonService.reorderLessons(courseId, lessonIds);
        return ResponseEntity.ok().build();
    }

    /**
     * Get lessons by course (pour l'admin)
     */
    @GetMapping("/by-course/{courseId}")
    public ResponseEntity<List<LessonResponse>> getLessonsByCourse(@PathVariable UUID courseId) {
        List<Lesson> lessons = lessonService.getLessonsByCourse(courseId);
        return ResponseEntity.ok(lessons.stream().map(this::mapToResponse).toList());
    }

    private LessonResponse mapToResponse(Lesson lesson) {
        return LessonResponse.builder()
                .id(lesson.getId().toString())
                .courseId(lesson.getCourse() != null ? lesson.getCourse().getId().toString() : null)
                .title(lesson.getTitle())
                .content(lesson.getContent())
                .orderIndex(lesson.getOrder())
                .duration(lesson.getDuration_minutes())
                .videoUrl(lesson.getVideo_url())
                .build();
    }
}
