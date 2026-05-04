package com.system.sias.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "document_type")
public class DocumentType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentTypeId;

    @Column(nullable = false)
    private String documentName;

    private Boolean isRequired = true;
}