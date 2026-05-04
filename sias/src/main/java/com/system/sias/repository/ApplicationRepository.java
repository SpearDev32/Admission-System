package com.system.sias.repository;

import com.system.sias.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> findByControlNo(String controlNo);

    // This allows the Service to delete applications by the applicant's ID
    void deleteByApplicantId(Long applicantId);
}