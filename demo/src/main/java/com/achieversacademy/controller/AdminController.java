package com.achieversacademy.controller;

import com.achieversacademy.entity.*;
import com.achieversacademy.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private BatchService batchService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private ReportService reportService;

    // User Management
    @GetMapping("/pending-users")
    public ResponseEntity<Map<String, List<User>>> getPendingUsers() {
        Map<String, List<User>> pendingUsers = new HashMap<>();
        pendingUsers.put("students", userService.getPendingUsers(Role.STUDENT));
        pendingUsers.put("tutors", userService.getPendingUsers(Role.TUTOR));
        return ResponseEntity.ok(pendingUsers);
    }

    @PostMapping("/approve-user/{userId}")
    public ResponseEntity<?> approveUser(@PathVariable Long userId, Authentication authentication) {
        try {
            User admin = securityService.getCurrentUser(authentication.getName());
            userService.approveUser(userId, admin);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "User approved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/reject-user/{userId}")
    public ResponseEntity<?> rejectUser(@PathVariable Long userId, Authentication authentication) {
        try {
            User admin = securityService.getCurrentUser(authentication.getName());
            userService.rejectUser(userId, admin);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "User rejected successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Batch Management
    @PostMapping("/batches")
    public ResponseEntity<?> createBatch(@RequestBody BatchRequest batchRequest, Authentication authentication) {
        try {
            User admin = securityService.getCurrentUser(authentication.getName());
            Batch batch = batchService.createBatch(batchRequest.getName(), batchRequest.getDescription(), admin);
            return ResponseEntity.ok(batch);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/batches/{batchId}")
    public ResponseEntity<?> updateBatch(@PathVariable Long batchId, @RequestBody BatchRequest batchRequest) {
        try {
            Batch batch = batchService.updateBatch(batchId, batchRequest.getName(), batchRequest.getDescription());
            return ResponseEntity.ok(batch);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/batches/{batchId}")
    public ResponseEntity<?> deleteBatch(@PathVariable Long batchId) {
        try {
            batchService.deleteBatch(batchId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Batch deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/batches")
    public ResponseEntity<List<Batch>> getAllBatches() {
        return ResponseEntity.ok(reportService.getAllBatches());
    }

    @GetMapping("/batches/search")
    public ResponseEntity<List<Batch>> searchBatches(@RequestParam String name) {
        return ResponseEntity.ok(batchService.searchBatches(name));
    }

    @PostMapping("/batches/{batchId}/assign-students")
    public ResponseEntity<?> assignStudentsToBatch(@PathVariable Long batchId, @RequestBody AssignmentRequest request) {
        try {
            Batch batch = batchService.assignStudentsToBatch(batchId, request.getUserIds());
            return ResponseEntity.ok(batch);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/batches/{batchId}/assign-tutors")
    public ResponseEntity<?> assignTutorsToBatch(@PathVariable Long batchId, @RequestBody AssignmentRequest request) {
        try {
            Batch batch = batchService.assignTutorsToBatch(batchId, request.getUserIds());
            return ResponseEntity.ok(batch);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/batches/{batchId}/students")
    public ResponseEntity<List<User>> getStudentsInBatch(@PathVariable Long batchId) {
        return ResponseEntity.ok(batchService.getStudentsInBatch(batchId));
    }

    @GetMapping("/batches/{batchId}/tutors")
    public ResponseEntity<List<User>> getTutorsInBatch(@PathVariable Long batchId) {
        return ResponseEntity.ok(batchService.getTutorsInBatch(batchId));
    }

    // User Lists
    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        return ResponseEntity.ok(reportService.getAllStudents());
    }

    @GetMapping("/tutors")
    public ResponseEntity<List<User>> getAllTutors() {
        return ResponseEntity.ok(reportService.getAllTutors());
    }

    // Reports
    @GetMapping("/reports/batch-attendance")
    public ResponseEntity<?> getBatchAttendanceReport(
            @RequestParam Long batchId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            Map<String, Object> report = reportService.generateBatchAttendanceReport(batchId, start, end);
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/reports/student-attendance")
    public ResponseEntity<?> getStudentAttendanceReport(
            @RequestParam Long studentId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            Map<String, Object> report = reportService.generateStudentAttendanceReport(studentId, start, end);
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Inner classes for request bodies
    public static class BatchRequest {
        private String name;
        private String description;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class AssignmentRequest {
        private Set<Long> userIds;

        public Set<Long> getUserIds() { return userIds; }
        public void setUserIds(Set<Long> userIds) { this.userIds = userIds; }
    }
}