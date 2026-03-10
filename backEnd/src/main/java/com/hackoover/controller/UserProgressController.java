package com.hackoover.controller;

import com.hackoover.model.UserProgress;
import com.hackoover.service.UserProgressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user-progress")
@CrossOrigin
public class UserProgressController {
    private final UserProgressService service;
    public UserProgressController(UserProgressService s){this.service=s;}

    @GetMapping("/by-user")
    public List<UserProgress> byUser(@RequestParam String email){ return service.findByUser(email); }

    @GetMapping("/by-course-and-user")
    public List<UserProgress> byCourseAndUser(@RequestParam UUID courseId, @RequestParam String email){
        return service.findByCourseAndUser(courseId, email);
    }

    @PostMapping
    public UserProgress upsert(@RequestBody UserProgress p){ return service.upsert(p); }
}
