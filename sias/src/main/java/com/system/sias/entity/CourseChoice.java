package com.system.sias.entity;

import jakarta.persistence.*;
import lombok.*;
// If Application and Course are in the same folder, no extra import is needed.
// If they are red, try:
// import com.system.sias.entity.Application;
// import com.system.sias.entity.Course;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "course_choice")
public class CourseChoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long choiceId;

    @ManyToOne
    @JoinColumn(name = "application_id")
    private Application application;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private Integer priorityLevel;
}