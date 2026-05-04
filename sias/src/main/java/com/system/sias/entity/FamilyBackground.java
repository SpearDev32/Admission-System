package com.system.sias.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "family_background")
public class FamilyBackground {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long familyId;

    @OneToOne
    @JoinColumn(name = "application_id")
    private Application application;

    private String fatherLastName;
    private String fatherFirstName;
    private String fatherMiddleName;
    private String fatherCpNo;
    private String fatherOccupation;
    private BigDecimal fatherAnnualIncome;

    private String motherLastName;
    private String motherFirstName;
    private String motherMiddleName;
    private String motherCpNo;
    private String motherOccupation;
    private BigDecimal motherAnnualIncome;

    private String guardianName;
    private String guardianRelationship;
    private String guardianCpNo;
}