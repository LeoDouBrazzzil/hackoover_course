package com.hackoover.service;

import com.hackoover.model.UserProgress;
import com.hackoover.repository.UserProgressRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserProgressService {
    private final UserProgressRepository repo;
    public UserProgressService(UserProgressRepository repo){this.repo=repo;}
    public List<UserProgress> findByUser(String email){ return repo.findByUser_email(email); }

    public UserProgress upsert(UserProgress p){
        UserProgress existing = repo.findByUserEmailAndLessonId(p.getUser().getEmail(), p.getLesson().getId());
        if(existing!=null){
            existing.setCompleted(p.getCompleted());
            existing.setCompleted_date(p.getCompleted_date() != null ? p.getCompleted_date() : OffsetDateTime.now());
            return repo.save(existing);
        }
        if(p.getCompleted_date()==null) p.setCompleted_date(OffsetDateTime.now());
        return repo.save(p);
    }

    public List<UserProgress> findByCourseAndUser(UUID courseId, String email){
        return repo.findByCourse_idAndUser_email(courseId, email);
    }
}
