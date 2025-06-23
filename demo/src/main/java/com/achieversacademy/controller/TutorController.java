package com.achieversacademy.controller;

import com.achieversacademy.entity.Tutor;
import com.achieversacademy.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tutors")
@CrossOrigin(origins = "http://localhost:3000") // Add CORS support
public class TutorController {

    @Autowired
    private TutorService tutorService;

    @GetMapping
    public ResponseEntity<List<Tutor>> getAllTutors() {
        try {
            List<Tutor> tutors = tutorService.getApprovedTutors();
            return ResponseEntity.ok(tutors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Tutor>> getPendingTutors() {
        try {
            List<Tutor> pendingTutors = tutorService.getPendingTutors();
            return ResponseEntity.ok(pendingTutors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/approve/{tutorId}")
    public ResponseEntity<Tutor> approveTutor(@PathVariable Long tutorId) {
        try {
            Tutor approvedTutor = tutorService.approveTutor(tutorId);
            if (approvedTutor != null) {
                return ResponseEntity.ok(approvedTutor);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createTutor(@RequestBody Tutor tutor) {
        try {
            // Set default status as PENDING for new registrations
            tutor.setStatus("PENDING");
            Tutor savedTutor = tutorService.saveTutor(tutor);
            return ResponseEntity.ok(savedTutor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
}