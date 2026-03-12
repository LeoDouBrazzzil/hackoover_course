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
public class CourseRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    private String imageUrl;

    @NotBlank(message = "Difficulty is required")
    private String difficulty; // BEGINNER, INTERMEDIATE, ADVANCED

    private Integer duration; // en minutes

    private Boolean featured = false;

    @NotBlank(message = "Category is required")
    private String category;
}
