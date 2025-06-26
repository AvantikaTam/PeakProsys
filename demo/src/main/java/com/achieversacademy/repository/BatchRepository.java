package com.achieversacademy.repository;

import com.achieversacademy.entity.Batch;
import com.achieversacademy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {
    
    List<Batch> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT b FROM Batch b JOIN b.students s WHERE s.id = :studentId")
    List<Batch> findByStudentId(@Param("studentId") Long studentId);
    
    @Query("SELECT b FROM Batch b JOIN b.tutors t WHERE t.id = :tutorId")
    List<Batch> findByTutorId(@Param("tutorId") Long tutorId);
    
    @Query("SELECT s FROM Batch b JOIN b.students s WHERE b.id = :batchId")
    List<User> findStudentsByBatchId(@Param("batchId") Long batchId);
    
    @Query("SELECT t FROM Batch b JOIN b.tutors t WHERE b.id = :batchId")
    List<User> findTutorsByBatchId(@Param("batchId") Long batchId);
}