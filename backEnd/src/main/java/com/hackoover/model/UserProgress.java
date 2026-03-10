package com.hackoover.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_progress")
public class UserProgress {
    @Id
    @Column(name="id", columnDefinition = "uuid")
    private UUID id;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private Boolean completed = false;

    private OffsetDateTime completed_date;

    @PrePersist
    public void prePersist(){ if (id==null) id = UUID.randomUUID(); }

    // getters/setters...
    public java.util.UUID getId(){return id;}
    public void setId(java.util.UUID id){this.id=id;}
    public Boolean getCompleted(){return completed;}
    public void setCompleted(Boolean v){this.completed=v;}
    public OffsetDateTime getCompleted_date(){return completed_date;}
    public void setCompleted_date(OffsetDateTime d){this.completed_date=d;}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
