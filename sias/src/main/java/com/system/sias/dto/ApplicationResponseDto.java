package com.system.sias.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ApplicationResponseDto {
    private String controlNo;
    private String status;
    private String message;
}