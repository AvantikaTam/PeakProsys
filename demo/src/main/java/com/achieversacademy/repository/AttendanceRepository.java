package com.achieversacademy.repository;

import com.achieversacademy.entity.Attendance;
import com.achieversacademy.entity.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    
    @Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId AND a.batch.id = :batchId")
    List<Attendance> findByStudentAndBatch(@Param("studentId") Long studentId, @Param("batchId") Long batchId);
    
    @Query("SELECT a FROM Attendance a WHERE a.batch.id = :batchId AND a.attendanceDate = :date")
    List<Attendance> findByBatchAndDate(@Param("batchId") Long batchId, @Param("date") LocalDate date);
    
    @Query("SELECT a FROM Attendance a WHERE a.batch.id = :batchId AND a.attendanceDate BETWEEN :startDate AND :endDate")
    List<Attendance> findByBatchAndDateRange(@Param("batchId") Long batchId, 
                                           @Param("startDate") LocalDate startDate, 
                                           @Param("endDate") LocalDate endDate);
    
    @Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId AND a.attendanceDate BETWEEN :startDate AND :endDate")
    List<Attendance> findByStudentAndDateRange(@Param("studentId") Long studentId, 
                                             @Param("startDate") LocalDate startDate, 
                                             @Param("endDate") LocalDate endDate);
    
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.batch.id = :batchId AND a.status = :status AND a.attendanceDate BETWEEN :startDate AND :endDate")
    Long countByBatchAndStatusAndDateRange(@Param("batchId") Long batchId, 
                                         @Param("status") AttendanceStatus status,
                                         @Param("startDate") LocalDate startDate, 
                                         @Param("endDate") LocalDate endDate);
}