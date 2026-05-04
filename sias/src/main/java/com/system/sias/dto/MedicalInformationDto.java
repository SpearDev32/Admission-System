package com.system.sias.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class MedicalInformationDto {
    private String bloodType;
    private String allergies;
    private String medicalCondition;
    private Boolean covidVaccinated;
}