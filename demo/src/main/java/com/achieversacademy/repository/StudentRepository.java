package com.achieversacademy.repository;

import com.achieversacademy.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByApproved(boolean approved);
    List<Student> findByStatus(String status);
    Student findByUsername(String username);
}
