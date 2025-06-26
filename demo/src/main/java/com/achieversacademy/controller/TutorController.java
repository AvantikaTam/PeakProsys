package com.achieversacademy.controller;

import com.achieversacademy.entity.*;
import com.achieversacademy.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tutor")
@CrossOrigin(origins = "*")
public class TutorController {

    @Autowired
    private BatchService batchService;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private SecurityService securityService;

    @GetMapping("/batches")
    public ResponseEntity<List<Batch>> getTutorBatches(Authentication authentication) {
        User tutor = securityService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(batchService.getBatchesForTutor(tutor.getId()));
    }

    @GetMapping("/batches/{batchId}/students")
    public ResponseEntity<List<User>> getStudentsInBatch(@PathVariable Long batchId) {
        return ResponseEntity.ok(batchService.getStudentsInBatch(batchId));
    }

    // Attendance Management
    @PostMapping("/attendance/mark")
    public ResponseEntity<?> markAttendance(@RequestBody AttendanceRequest request, Authentication authentication) {
        try {
            User tutor = securityService.getCurrentUser(authentication.getName());
            Attendance attendance = attendanceService.markAttendance(
                request.getStudentId(),
                request.getBatchId(),
                tutor.getId(),
                LocalDate.parse(request.getDate()),
                AttendanceStatus.valueOf(request.getStatus().toUpperCase()),
                request.getRemarks()
            );
            return ResponseEntity.ok(attendance);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/attendance/batch/{batchId}")
    public ResponseEntity<List<Attendance>> getBatchAttendance(
            @PathVariable Long batchId,
            @RequestParam String date) {
        LocalDate attendanceDate = LocalDate.parse(date);
        return ResponseEntity.ok(attendanceService.getAttendanceForBatchAndDate(batchId, attendanceDate));
    }

    @GetMapping("/attendance/batch/{batchId}/range")
    public ResponseEntity<List<Attendance>> getBatchAttendanceRange(
            @PathVariable Long batchId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return ResponseEntity.ok(attendanceService.getAttendanceForBatchAndDateRange(batchId, start, end));
    }

    // Resource Management
    @PostMapping("/resources/upload")
    public ResponseEntity<?> uploadResource(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("batchId") Long batchId,
            @RequestParam("resourceType") String resourceType,
            Authentication authentication) {
        try {
            User tutor = securityService.getCurrentUser(authentication.getName());
            Resource resource = resourceService.uploadResource(
                tutor.getId(),
                batchId,
                title,
                description,
                ResourceType.valueOf(resourceType.toUpperCase()),
                file
            );
            return ResponseEntity.ok(resource);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/resources/my-uploads")
    public ResponseEntity<List<Resource>> getMyUploads(Authentication authentication) {
        User tutor = securityService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(resourceService.getResourcesUploadedByTutor(tutor.getId()));
    }

    @PostMapping("/resources/{resourceId}/deactivate")
    public ResponseEntity<?> deactivateResource(@PathVariable Long resourceId) {
        try {
            resourceService.deactivateResource(resourceId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Resource deactivated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/resources/{resourceId}/activate")
    public ResponseEntity<?> activateResource(@PathVariable Long resourceId) {
        try {
            resourceService.activateResource(resourceId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Resource activated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Inner class for request body
    public static class AttendanceRequest {
        private Long studentId;
        private Long batchId;
        private String date;
        private String status;
        private String remarks;

        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        public Long getBatchId() { return batchId; }
        public void setBatchId(Long batchId) { this.batchId = batchId; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getRemarks() { return remarks; }
        public void setRemarks(String remarks) { this.remarks = remarks; }
    }
}