package com.achieversacademy.service;

import com.achieversacademy.entity.Student;
import com.achieversacademy.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public Student saveStudent(Student student) {
        // Encode password before saving
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setStatus("PENDING");
        student.setApproved(false);
        return studentRepository.save(student);
    }
    
    public List<Student> getApprovedStudents() {
        return studentRepository.findByApproved(true);
    }
    
    public List<Student> getPendingStudents() {
        return studentRepository.findByApproved(false);
    }
    
    public Student approveStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        if (student != null) {
            student.setApproved(true);
            student.setStatus("APPROVED");
            return studentRepository.save(student);
        }
        return null;
    }
    
    public Student findById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }
    
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}