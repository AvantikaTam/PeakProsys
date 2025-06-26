package com.achieversacademy.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(name = "first_name", nullable = false)
    private String firstName;
    
    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status = UserStatus.PENDING;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "approved_at")
    private LocalDateTime approvedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by_admin_id")
    private User approvedByAdmin;
    
    @ManyToMany(mappedBy = "students", fetch = FetchType.LAZY)
    private Set<Batch> studentBatches = new HashSet<>();
    
    @ManyToMany(mappedBy = "tutors", fetch = FetchType.LAZY)
    private Set<Batch> tutorBatches = new HashSet<>();
    
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Attendance> attendanceRecords = new HashSet<>();
    
    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Resource> uploadedResources = new HashSet<>();
    
    // Constructors
    public User() {}
    
    public User(String username, String email, String password, String firstName, String lastName, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    
    public UserStatus getStatus() { return status; }
    public void setStatus(UserStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getApprovedAt() { return approvedAt; }
    public void setApprovedAt(LocalDateTime approvedAt) { this.approvedAt = approvedAt; }
    
    public User getApprovedByAdmin() { return approvedByAdmin; }
    public void setApprovedByAdmin(User approvedByAdmin) { this.approvedByAdmin = approvedByAdmin; }
    
    public Set<Batch> getStudentBatches() { return studentBatches; }
    public void setStudentBatches(Set<Batch> studentBatches) { this.studentBatches = studentBatches; }
    
    public Set<Batch> getTutorBatches() { return tutorBatches; }
    public void setTutorBatches(Set<Batch> tutorBatches) { this.tutorBatches = tutorBatches; }
    
    public Set<Attendance> getAttendanceRecords() { return attendanceRecords; }
    public void setAttendanceRecords(Set<Attendance> attendanceRecords) { this.attendanceRecords = attendanceRecords; }
    
    public Set<Resource> getUploadedResources() { return uploadedResources; }
    public void setUploadedResources(Set<Resource> uploadedResources) { this.uploadedResources = uploadedResources; }
}