package com.system.sias.controller;

import com.system.sias.dto.MasterApplicationDto;
import com.system.sias.dto.ApplicationResponseDto;
import com.system.sias.service.ApplicationService; // This must match your folder path
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    // This handles the "Submit" request from Postman
    @PostMapping("/submit")
    public ResponseEntity<ApplicationResponseDto> submit(@RequestBody MasterApplicationDto dto) {
        // Change "submitApplication" to "saveApplication" IF that's what you named it in Service
        return ResponseEntity.ok(applicationService.submitApplication(dto));
    }

    // This handles the "Check Status" request from Postman
    @GetMapping("/status/{controlNo}")
    public ResponseEntity<ApplicationResponseDto> getStatus(@PathVariable String controlNo) {
        // Change "getStatus" to "getApplicationStatus" IF that's what you named it in Service
        return ResponseEntity.ok(applicationService.getStatus(controlNo));
    }

    @DeleteMapping("/applicant/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        applicationService.deleteApplicant(id);
        return ResponseEntity.ok("Applicant with ID " + id + " has been deleted successfully.");
    }
}