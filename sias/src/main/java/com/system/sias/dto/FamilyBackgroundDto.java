package com.system.sias.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class FamilyBackgroundDto {
    private String fatherName;
    private String motherName;
    private String guardianName;
    private String guardianRelationship;
    private String guardianCpNo;
    private BigDecimal monthlyIncome;

}