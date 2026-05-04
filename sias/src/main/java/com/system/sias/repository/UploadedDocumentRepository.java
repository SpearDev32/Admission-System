package com.system.sias.repository;

import com.system.sias.entity.UploadedDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UploadedDocumentRepository extends JpaRepository<UploadedDocument, Long> {
    List<UploadedDocument> findByApplication_ApplicationId(Long applicationId);
}