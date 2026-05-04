package com.system.sias.repository;

import com.system.sias.entity.MedicalInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalInformationRepository extends JpaRepository<MedicalInformation, Long> {
}