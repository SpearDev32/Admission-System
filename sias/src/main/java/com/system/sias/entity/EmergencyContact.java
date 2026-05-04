package com.system.sias.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "emergency_contact")
public class EmergencyContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emergencyId;

    @OneToOne
    @JoinColumn(name = "application_id")
    private Application application;

    private String contactName;
    private String relationship;
    private String contactNumber;
    private String address;
}