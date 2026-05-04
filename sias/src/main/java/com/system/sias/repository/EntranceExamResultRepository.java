package com.system.sias.repository;

import com.system.sias.entity.EntranceExamResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntranceExamResultRepository extends JpaRepository<EntranceExamResult, Long> {
    java.util.Optional<EntranceExamResult> findByApplication_ApplicationId(Long applicationId);
}