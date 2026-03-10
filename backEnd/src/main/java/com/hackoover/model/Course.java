package com.hackoover.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @Column(name="id", columnDefinition = "uuid")
    private UUID id;

    private String title;

    @Column(columnDefinition = "text")
    private String description;

    private String level;
    private String category;
    private Integer duration_hours;
    private String image_url;
    private Boolean isFeatured;
    private Integer enrolled_count = 0;

    @PrePersist
    public void prePersist() {
        if (id == null) id = UUID.randomUUID();
    }


    public java.util.UUID getId(){return id;}
    public void setId(java.util.UUID id){this.id=id;}
    public String getTitle(){return title;}
    public void setTitle(String t){this.title=t;}
    public String getDescription(){return description;}
    public void setDescription(String d){this.description=d;}
    public String getLevel(){return level;}
    public void setLevel(String l){this.level=l;}
    public String getCategory(){return category;}
    public void setCategory(String c){this.category=c;}
    public Integer getDuration_hours(){return duration_hours;}
    public void setDuration_hours(Integer v){this.duration_hours=v;}
    public String getImage_url(){return image_url;}
    public void setImage_url(String u){this.image_url=u;}

    public Integer getEnrolled_count(){return enrolled_count;}
    public void setEnrolled_count(Integer e){this.enrolled_count=e;}

    public Boolean getFeatured() {
        return isFeatured;
    }

    public void setFeatured(Boolean featured) {
        isFeatured = featured;
    }
}
