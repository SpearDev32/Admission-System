package com.system.sias.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "medical_information")
public class MedicalInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicalId;

    @OneToOne
    @JoinColumn(name = "application_id")
    private Application application;

    private String bloodType;
    private Double heightCm;
    private Double weightKg;
    private String allergies;
    private String medicalCondition;
    private String physicalDisability;
    private Boolean hospitalizedBefore;
    private Boolean surgeryBefore;
    private Boolean takingMedication;
    private Boolean covidVaccinated;
    private String covidBrand;
    private Integer covidDoses;
}