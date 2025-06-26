package com.achieversacademy.controller;

import com.achieversacademy.entity.*;
import com.achieversacademy.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private BatchService batchService;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private SecurityService securityService;

    @GetMapping("/batches")
    public ResponseEntity<List<Batch>> getMyBatches(Authentication authentication) {
        User student = securityService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(batchService.getBatchesForStudent(student.getId()));
    }

    @GetMapping("/attendance")
    public ResponseEntity<List<Attendance>> getMyAttendance(
            @RequestParam String startDate,
            @RequestParam String endDate,
            Authentication authentication) {
        User student = securityService.getCurrentUser(authentication.getName());
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return ResponseEntity.ok(attendanceService.getAttendanceForStudentAndDateRange(student.getId(), start, end));
    }

    @GetMapping("/resources/batch/{batchId}")
    public ResponseEntity<List<Resource>> getBatchResources(@PathVariable Long batchId) {
        return ResponseEntity.ok(resourceService.getActiveResourcesForBatch(batchId));
    }

    @GetMapping("/resources/batch/{batchId}/type/{resourceType}")
    public ResponseEntity<List<Resource>> getBatchResourcesByType(
            @PathVariable Long batchId,
            @PathVariable String resourceType) {
        ResourceType type = ResourceType.valueOf(resourceType.toUpperCase());
        return ResponseEntity.ok(resourceService.getActiveResourcesForBatchByType(batchId, type));
    }
}