package com.achieversacademy.entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "batch_id", "attendance_date"}))
public class Attendance {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "batch_id", nullable = false)
    private Batch batch;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "marked_by_tutor_id", nullable = false)
    private User markedByTutor;
    
    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus status;
    
    @Column(columnDefinition = "TEXT")
    private String remarks;
    
    @Column(name = "marked_at", nullable = false)
    private LocalDateTime markedAt = LocalDateTime.now();
    
    // Constructors
    public Attendance() {}
    
    public Attendance(User student, Batch batch, User markedByTutor, LocalDate attendanceDate, AttendanceStatus status) {
        this.student = student;
        this.batch = batch;
        this.markedByTutor = markedByTutor;
        this.attendanceDate = attendanceDate;
        this.status = status;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    
    public Batch getBatch() { return batch; }
    public void setBatch(Batch batch) { this.batch = batch; }
    
    public User getMarkedByTutor() { return markedByTutor; }
    public void setMarkedByTutor(User markedByTutor) { this.markedByTutor = markedByTutor; }
    
    public LocalDate getAttendanceDate() { return attendanceDate; }
    public void setAttendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; }
    
    public AttendanceStatus getStatus() { return status; }
    public void setStatus(AttendanceStatus status) { this.status = status; }
    
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    
    public LocalDateTime getMarkedAt() { return markedAt; }
    public void setMarkedAt(LocalDateTime markedAt) { this.markedAt = markedAt; }
}
