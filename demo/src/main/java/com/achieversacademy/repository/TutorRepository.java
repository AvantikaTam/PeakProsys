package com.achieversacademy.repository;

// TutorRepository.java


import com.achieversacademy.entity.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TutorRepository extends JpaRepository<Tutor, Long> {
    List<Tutor> findByApproved(boolean approved);
}