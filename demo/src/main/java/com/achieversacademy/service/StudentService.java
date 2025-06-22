package com.achieversacademy.service;
// StudentService.java


import com.achieversacademy.entity.Student;
import com.achieversacademy.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
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
            return studentRepository.save(student);
        }
        return null;
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }
}