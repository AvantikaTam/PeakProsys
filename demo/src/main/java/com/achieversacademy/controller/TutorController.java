package com.achieversacademy.controller;

// TutorController.java


import com.achieversacademy.entity.Tutor;
import com.achieversacademy.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tutors")
public class TutorController {
    @Autowired
    private TutorService tutorService;

    @GetMapping
    public List<Tutor> getAllTutors() {
        return tutorService.getApprovedTutors();
    }

    @GetMapping("/pending")
    public List<Tutor> getPendingTutors() {
        return tutorService.getPendingTutors();
    }

    @PostMapping("/approve/{tutorId}")
    public ResponseEntity<Tutor> approveTutor(@PathVariable Long tutorId) {
        Tutor approvedTutor = tutorService.approveTutor(tutorId);
        if (approvedTutor != null) {
            return ResponseEntity.ok(approvedTutor);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Tutor createTutor(@RequestBody Tutor tutor) {
        return tutorService.saveTutor(tutor);
    }
}