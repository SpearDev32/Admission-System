package com.system.sias.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "applications")
public class Application extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    @Column(unique = true, nullable = false)
    private String controlNo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "applicant_id", referencedColumnName = "id") // FIX: Changed 'applicantId' to 'id'
    private Applicant applicant;

    @ManyToOne
    @JoinColumn(name = "classification_id")
    private Classification classification;

    private String status = "PENDING";

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @OneToOne(mappedBy = "application", cascade = CascadeType.ALL)
    private FamilyBackground familyBackground;

    @OneToOne(mappedBy = "application", cascade = CascadeType.ALL)
    private MedicalInformation medicalInformation;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL)
    private List<UploadedDocument> documents;
}