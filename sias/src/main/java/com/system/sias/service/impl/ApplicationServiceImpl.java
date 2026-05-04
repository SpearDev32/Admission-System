package com.system.sias.service.impl;

import com.system.sias.dto.*;
import com.system.sias.entity.*;
import com.system.sias.mapper.ApplicationMapper;
import com.system.sias.repository.*;
import com.system.sias.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicantRepository applicantRepo;
    private final ApplicationRepository applicationRepo;
    private final ApplicationMapper mapper;

    @Override
    @Transactional
    public ApplicationResponseDto submitApplication(MasterApplicationDto masterDto) {
        Applicant applicant = mapper.toApplicantEntity(masterDto.getApplicant());
        Applicant savedApplicant = applicantRepo.save(applicant);

        Application application = new Application();
        application.setApplicant(savedApplicant);
        application.setControlNo("ADM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        application.setStatus("PENDING");

        Application savedApp = applicationRepo.save(application);
        return mapper.toResponseDto(savedApp, "Application submitted successfully!");
    }

    @Override
    public ApplicationResponseDto getStatus(String controlNo) { return null; }

    @Override
    public AdmissionDto applyForAdmission(Long studentId) { return null; }

    @Override
    public AdmissionDto updateAdmissionStatus(Long admissionId, String status) { return null; }

    @Override
    public boolean isStudentApproved(Long studentId) { return false; }

    @Override
    @Transactional
    public void deleteApplicant(Long id) {
        if (applicantRepo.existsById(id)) {
            // Delete dependent records first
            applicationRepo.deleteByApplicantId(id);
            applicantRepo.deleteById(id);
        }
    }
}