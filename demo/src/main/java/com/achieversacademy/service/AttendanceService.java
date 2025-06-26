package com.achieversacademy.service;

import com.achieversacademy.entity.Attendance;
import com.achieversacademy.entity.AttendanceStatus;
import com.achieversacademy.entity.Batch;
import com.achieversacademy.entity.User;
import com.achieversacademy.repository.AttendanceRepository;
import com.achieversacademy.repository.BatchRepository;
import com.achieversacademy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final BatchRepository batchRepository;

    @Autowired
    public AttendanceService(AttendanceRepository attendanceRepository, 
                           UserRepository userRepository, 
                           BatchRepository batchRepository) {
        this.attendanceRepository = attendanceRepository;
        this.userRepository = userRepository;
        this.batchRepository = batchRepository;
    }

    public Attendance markAttendance(Long studentId, Long batchId, Long tutorId, 
                                   LocalDate date, AttendanceStatus status, String remarks) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));
        User tutor = userRepository.findById(tutorId)
                .orElseThrow(() -> new RuntimeException("Tutor not found"));

        // Check if tutor is assigned to this batch
        if (!batch.getTutors().contains(tutor)) {
            throw new RuntimeException("Tutor is not assigned to this batch");
        }

        // Check if student is in this batch
        if (!batch.getStudents().contains(student)) {
            throw new RuntimeException("Student is not in this batch");
        }

        // Check if attendance already marked for this student on this date
        attendanceRepository.findByStudentAndBatch(studentId, batchId).stream()
                .filter(a -> a.getAttendanceDate().equals(date))
                .findFirst()
                .ifPresent(a -> {
                    throw new RuntimeException("Attendance already marked for this student on " + date);
                });

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setBatch(batch);
        attendance.setMarkedByTutor(tutor);
        attendance.setAttendanceDate(date);
        attendance.setStatus(status);
        attendance.setRemarks(remarks);

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceForBatchAndDate(Long batchId, LocalDate date) {
        return attendanceRepository.findByBatchAndDate(batchId, date);
    }

    public List<Attendance> getAttendanceForBatchAndDateRange(Long batchId, LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByBatchAndDateRange(batchId, startDate, endDate);
    }

    public List<Attendance> getAttendanceForStudentAndDateRange(Long studentId, LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByStudentAndDateRange(studentId, startDate, endDate);
    }

    public Long getAttendanceCountByStatus(Long batchId, AttendanceStatus status, 
                                         LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.countByBatchAndStatusAndDateRange(batchId, status, startDate, endDate);
    }
}