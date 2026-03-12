package com.hackoover.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonRequest {

    @NotNull(message = "Course ID is required")
    private String courseId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content; // HTML from TipTap editor

    @NotNull(message = "Order index is required")
    private Integer orderIndex;

    private Integer duration; // en minutes

    private String videoUrl;
}
