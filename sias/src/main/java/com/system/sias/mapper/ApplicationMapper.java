package com.system.sias.mapper;

import com.system.sias.dto.*;
import com.system.sias.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper {

    // Converts ApplicantDto to Applicant Entity
    public Applicant toApplicantEntity(ApplicantDto dto) {
        if (dto == null) return null;
        Applicant entity = new Applicant();
        entity.setLastName(dto.getLastName());
        entity.setFirstName(dto.getFirstName());
        entity.setMiddleName(dto.getMiddleName());
        entity.setSex(dto.getSex());
        entity.setDateOfBirth(dto.getDateOfBirth());
        entity.setEmail(dto.getEmail());
        entity.setContactNo(dto.getContactNo());
        entity.setHomeAddress(dto.getHomeAddress());
        return entity;
    }

    public FamilyBackground toFamilyEntity(FamilyBackgroundDto dto) {
        if (dto == null) return null;
        FamilyBackground entity = new FamilyBackground();

        entity.setFatherFirstName(dto.getFatherName());
        entity.setMotherFirstName(dto.getMotherName());

        entity.setGuardianName(dto.getGuardianName());
        entity.setGuardianRelationship(dto.getGuardianRelationship());
        entity.setGuardianCpNo(dto.getGuardianCpNo());

        return entity;
    }

    public MedicalInformation toMedicalEntity(MedicalInformationDto dto) {
        if (dto == null) return null;
        MedicalInformation entity = new MedicalInformation();

        entity.setBloodType(dto.getBloodType());
        entity.setAllergies(dto.getAllergies());

        entity.setMedicalCondition(dto.getMedicalCondition());
        entity.setCovidVaccinated(dto.getCovidVaccinated());

        return entity;
    }

    // Converts saved Application back to a Response DTO for the user
    public ApplicationResponseDto toResponseDto(Application entity, String message) {
        if (entity == null) return null;
        ApplicationResponseDto dto = new ApplicationResponseDto();
        dto.setControlNo(entity.getControlNo());
        dto.setStatus(entity.getStatus());
        dto.setMessage(message);
        return dto;
    }
}