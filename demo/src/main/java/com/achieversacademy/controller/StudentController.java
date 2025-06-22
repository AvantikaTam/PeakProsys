package com.achieversacademy.controller;

// StudentController.java


import com.achieversacademy.entity.Student;
import com.achieversacademy.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getApprovedStudents();
    }

    @GetMapping("/pending")
    public List<Student> getPendingStudents() {
        return studentService.getPendingStudents();
    }

    @PostMapping("/approve/{studentId}")
    public ResponseEntity<Student> approveStudent(@PathVariable Long studentId) {
        Student approvedStudent = studentService.approveStudent(studentId);
        if (approvedStudent != null) {
            return ResponseEntity.ok(approvedStudent);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }
}