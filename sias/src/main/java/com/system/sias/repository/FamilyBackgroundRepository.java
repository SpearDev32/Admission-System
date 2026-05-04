package com.system.sias.repository;

import com.system.sias.entity.FamilyBackground;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyBackgroundRepository extends JpaRepository<FamilyBackground, Long> {
    FamilyBackground findByApplication_ApplicationId(Long applicationId);
}