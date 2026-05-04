package com.system.sias.service;

import com.system.sias.dto.MasterApplicationDto;
import com.system.sias.dto.ApplicationResponseDto;
import com.system.sias.dto.AdmissionDto;

public interface ApplicationService {
    ApplicationResponseDto submitApplication(MasterApplicationDto masterDto);
    ApplicationResponseDto getStatus(String controlNo);
    AdmissionDto applyForAdmission(Long studentId);
    AdmissionDto updateAdmissionStatus(Long admissionId, String status);
    boolean isStudentApproved(Long studentId);

    // The Delete Method
    void deleteApplicant(Long id);
}