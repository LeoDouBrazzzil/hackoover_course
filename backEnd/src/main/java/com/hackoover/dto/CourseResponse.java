package com.hackoover.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private String id;
    private String title;
    private String description;
    private String imageUrl;
    private String difficulty;
    private Integer duration;
    private Boolean featured;
    private String category;
}
