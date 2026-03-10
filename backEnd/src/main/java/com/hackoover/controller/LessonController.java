package com.hackoover.controller;

import com.hackoover.model.Lesson;
import com.hackoover.service.LessonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin
public class LessonController {
    private final LessonService service;
    public LessonController(LessonService s){this.service=s;}

    @GetMapping
    public List<Lesson> all(){ return service.findByCourse(null); }

    @GetMapping("/by-course/{courseId}")
    public List<Lesson> byCourse(@PathVariable UUID courseId){ return service.findByCourse(courseId); }

    @PostMapping
    public Lesson create(@RequestBody Lesson l){ return service.save(l); }
}
