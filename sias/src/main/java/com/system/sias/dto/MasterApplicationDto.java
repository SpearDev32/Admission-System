package com.system.sias.dto;

import lombok.*;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class MasterApplicationDto {
    private Long classificationId; // freshman, transferee, etc.
    private ApplicantDto applicant;
    private FamilyBackgroundDto familyBackground;
    private MedicalInformationDto medicalInformation;
    private List<CourseChoiceDto> courseChoices;
}