package com.achieversacademy.service;

import com.achieversacademy.entity.Attendance;
import com.achieversacademy.entity.AttendanceStatus;
import com.achieversacademy.entity.Batch;
import com.achieversacademy.entity.Role;
import com.achieversacademy.entity.User;
import com.achieversacademy.entity.UserStatus;
import com.achieversacademy.repository.AttendanceRepository;
import com.achieversacademy.repository.BatchRepository;
import com.achieversacademy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final BatchRepository batchRepository;

    @Autowired
    public ReportService(AttendanceRepository attendanceRepository, 
                        UserRepository userRepository, 
                        BatchRepository batchRepository) {
        this.attendanceRepository = attendanceRepository;
        this.userRepository = userRepository;
        this.batchRepository = batchRepository;
    }

    public Map<String, Object> generateBatchAttendanceReport(Long batchId, LocalDate startDate, LocalDate endDate) {
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        List<Attendance> attendances = attendanceRepository.findByBatchAndDateRange(batchId, startDate, endDate);
        List<User> students = batchRepository.findStudentsByBatchId(batchId);

        Map<Long, Map<AttendanceStatus, Long>> studentAttendanceStats = new HashMap<>();

        for (User student : students) {
            Map<AttendanceStatus, Long> stats = new HashMap<>();
            stats.put(AttendanceStatus.PRESENT, 
                    attendanceRepository.countByBatchAndStatusAndDateRange(
                            batchId, AttendanceStatus.PRESENT, startDate, endDate));
            stats.put(AttendanceStatus.ABSENT, 
                    attendanceRepository.countByBatchAndStatusAndDateRange(
                            batchId, AttendanceStatus.ABSENT, startDate, endDate));
            stats.put(AttendanceStatus.LATE, 
                    attendanceRepository.countByBatchAndStatusAndDateRange(
                            batchId, AttendanceStatus.LATE, startDate, endDate));
            studentAttendanceStats.put(student.getId(), stats);
        }

        Map<String, Object> report = new HashMap<>();
        report.put("batch", batch);
        report.put("startDate", startDate);
        report.put("endDate", endDate);
        report.put("totalClasses", attendances.stream()
                .map(Attendance::getAttendanceDate)
                .distinct()
                .count());
        report.put("studentStats", studentAttendanceStats);
        
        return report;
    }

    public Map<String, Object> generateStudentAttendanceReport(Long studentId, LocalDate startDate, LocalDate endDate) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Attendance> attendances = attendanceRepository.findByStudentAndDateRange(studentId, startDate, endDate);
        List<Batch> batches = batchRepository.findByStudentId(studentId);

        Map<Long, Map<AttendanceStatus, Long>> batchAttendanceStats = new HashMap<>();

        for (Batch batch : batches) {
            Map<AttendanceStatus, Long> stats = new HashMap<>();
            stats.put(AttendanceStatus.PRESENT, 
                    countAttendanceByStatus(studentId, batch.getId(), AttendanceStatus.PRESENT, startDate, endDate));
            stats.put(AttendanceStatus.ABSENT, 
                    countAttendanceByStatus(studentId, batch.getId(), AttendanceStatus.ABSENT, startDate, endDate));
            stats.put(AttendanceStatus.LATE, 
                    countAttendanceByStatus(studentId, batch.getId(), AttendanceStatus.LATE, startDate, endDate));
            batchAttendanceStats.put(batch.getId(), stats);
        }

        Map<String, Object> report = new HashMap<>();
        report.put("student", student);
        report.put("startDate", startDate);
        report.put("endDate", endDate);
        report.put("totalClasses", attendances.stream()
                .map(Attendance::getAttendanceDate)
                .distinct()
                .count());
        report.put("batchStats", batchAttendanceStats);
        
        return report;
    }

    private long countAttendanceByStatus(Long studentId, Long batchId, 
                                       AttendanceStatus status, 
                                       LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByStudentAndDateRange(studentId, startDate, endDate).stream()
                .filter(a -> a.getBatch().getId().equals(batchId) && a.getStatus() == status)
                .count();
    }

    public List<User> getAllStudents() {
        return userRepository.findByRoleAndStatus(Role.STUDENT, UserStatus.APPROVED);
    }

    public List<User> getAllTutors() {
        return userRepository.findByRoleAndStatus(Role.TUTOR, UserStatus.APPROVED);
    }

    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }
}