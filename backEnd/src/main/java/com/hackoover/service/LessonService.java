package com.hackoover.service;

import com.hackoover.model.Lesson;
import com.hackoover.repository.LessonRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class LessonService {
    private final LessonRepository repo;
    public LessonService(LessonRepository repo){this.repo=repo;}
    public List<Lesson> findByCourse(UUID courseId){
        if(courseId==null) return repo.findAll();
        return repo.findByCourseIdOrderByOrder(courseId);
    }
    public Lesson save(Lesson l){ return repo.save(l); }
}
