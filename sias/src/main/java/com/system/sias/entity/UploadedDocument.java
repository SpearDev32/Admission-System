package com.system.sias.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List; // ADD THIS LINE to fix the List error

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "uploaded_document")
public class UploadedDocument extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentId;

    @ManyToOne
    @JoinColumn(name = "application_id")
    private Application application;

    @ManyToOne
    @JoinColumn(name = "document_type_id")
    private DocumentType documentType;

    private String filePath;
    private String verifiedStatus = "Pending";
}