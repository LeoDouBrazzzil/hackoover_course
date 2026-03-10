package com.hackoover.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "lessons")
public class Lesson {
    @Id
    @Column(name="id", columnDefinition = "uuid")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private String title;

    @Column(columnDefinition = "text")
    private String content;

    private String chapter;

    @Column(name="order_index")
    private Integer order;

    private Integer duration_minutes;
    private String video_url;

    @PrePersist
    public void prePersist(){ if (id==null) id = UUID.randomUUID(); }

    // getters & setters
    public java.util.UUID getId(){return id;}
    public void setId(java.util.UUID id){this.id=id;}
    public String getTitle(){return title;}
    public void setTitle(String t){this.title=t;}
    public String getContent(){return content;}
    public void setContent(String c){this.content=c;}
    public String getChapter(){return chapter;}
    public void setChapter(String ch){this.chapter=ch;}
    public Integer getOrder(){return order;}
    public void setOrder(Integer o){this.order=o;}
    public Integer getDuration_minutes(){return duration_minutes;}
    public void setDuration_minutes(Integer d){this.duration_minutes=d;}
    public String getVideo_url(){return video_url;}
    public void setVideo_url(String v){this.video_url=v;}
}
