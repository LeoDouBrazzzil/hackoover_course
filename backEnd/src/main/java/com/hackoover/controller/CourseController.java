package com.hackoover.controller;

import com.hackoover.model.Course;
import com.hackoover.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin
public class CourseController {
    private final CourseService service;
    public CourseController(CourseService s){this.service=s;}

    @GetMapping
    public List<Course> list(){ return service.listAll(); }

    @GetMapping("/featured")
    public List<Course> featured(){ return service.featured(); }

    @GetMapping("/{id}")
    public Course get(@PathVariable UUID id){ return service.get(id); }

    @PostMapping
    public Course create(@RequestBody Course c){ return service.save(c); }
}
