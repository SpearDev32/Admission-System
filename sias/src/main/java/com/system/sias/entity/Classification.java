package com.system.sias.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "classifications")
public class Classification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classificationId;

    @Column(unique = true, nullable = false)
    private String classificationName;

    @OneToMany(mappedBy = "classification")
    private List<Application> applications;
}