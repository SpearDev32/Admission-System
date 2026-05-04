package com.system.sias.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CourseChoiceDto {
    private Long courseId;
    private Integer priorityLevel; // 1st choice, 2nd choice
}