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
public class LessonResponse {
    private String id;
    private String courseId;
    private String title;
    private String content;
    private Integer orderIndex;
    private Integer duration;
    private String videoUrl;
}
