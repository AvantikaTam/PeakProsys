package com.achieversacademy.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "batches")
public class Batch {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "start_date")
    private LocalDateTime startDate;
    
    @Column(name = "end_date")
    private LocalDateTime endDate;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_admin_id", nullable = false)
    private User createdByAdmin;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "batch_students",
        joinColumns = @JoinColumn(name = "batch_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<User> students = new HashSet<>();
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "batch_tutors",
        joinColumns = @JoinColumn(name = "batch_id"),
        inverseJoinColumns = @JoinColumn(name = "tutor_id")
    )
    private Set<User> tutors = new HashSet<>();
    
    @OneToMany(mappedBy = "batch", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Attendance> attendanceRecords = new HashSet<>();
    
    @OneToMany(mappedBy = "batch", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Resource> resources = new HashSet<>();
    
    // Constructors
    public Batch() {}
    
    public Batch(String name, String description, User createdByAdmin) {
        this.name = name;
        this.description = description;
        this.createdByAdmin = createdByAdmin;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    
    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public User getCreatedByAdmin() { return createdByAdmin; }
    public void setCreatedByAdmin(User createdByAdmin) { this.createdByAdmin = createdByAdmin; }
    
    public Set<User> getStudents() { return students; }
    public void setStudents(Set<User> students) { this.students = students; }
    
    public Set<User> getTutors() { return tutors; }
    public void setTutors(Set<User> tutors) { this.tutors = tutors; }
    
    public Set<Attendance> getAttendanceRecords() { return attendanceRecords; }
    public void setAttendanceRecords(Set<Attendance> attendanceRecords) { this.attendanceRecords = attendanceRecords; }
    
    public Set<Resource> getResources() { return resources; }
    public void setResources(Set<Resource> resources) { this.resources = resources; }
}
