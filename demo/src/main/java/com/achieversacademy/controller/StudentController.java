// StudentController.java
package com.achieversacademy.controller;

import com.achieversacademy.entity.Student;
import com.achieversacademy.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000") // Add CORS support
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        try {
            List<Student> students = studentService.getApprovedStudents();
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Student>> getPendingStudents() {
        try {
            List<Student> pendingStudents = studentService.getPendingStudents();
            return ResponseEntity.ok(pendingStudents);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/approve/{studentId}")
    public ResponseEntity<Student> approveStudent(@PathVariable Long studentId) {
        try {
            Student approvedStudent = studentService.approveStudent(studentId);
            if (approvedStudent != null) {
                return ResponseEntity.ok(approvedStudent);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        try {
            // Set default status as PENDING for new registrations
            student.setStatus("PENDING");
            Student savedStudent = studentService.saveStudent(student);
            return ResponseEntity.ok(savedStudent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
}
