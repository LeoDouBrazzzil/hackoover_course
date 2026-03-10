package com.hackoover.service;

import com.hackoover.model.Course;
import com.hackoover.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CourseService {
    private final CourseRepository repo;
    public CourseService(CourseRepository repo){this.repo=repo;}

    public List<Course> listAll(){ return repo.findAll(); }
    public List<Course> featured(){ return repo.findByIsFeaturedTrue(); }
    public Course get(UUID id){ return repo.findById(id).orElse(null); }
    public Course save(Course c){ return repo.save(c); }
}
