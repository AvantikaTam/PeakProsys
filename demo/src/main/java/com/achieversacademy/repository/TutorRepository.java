package com.achieversacademy.repository;

import com.achieversacademy.entity.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {
    List<Tutor> findByApproved(boolean approved);
    List<Tutor> findByStatus(String status);
    Tutor findByUsername(String username);
}