package com.system.sias.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ApplicantDto {
    private String lastName;
    private String firstName;
    private String middleName;
    private String sex;
    private LocalDate dateOfBirth;
    private String email;
    private String contactNo;
    private String homeAddress;
}