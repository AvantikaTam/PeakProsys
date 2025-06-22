package com.achieversacademy.repository;

// StudentRepository.java


import com.achieversacademy.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByApproved(boolean approved);
}