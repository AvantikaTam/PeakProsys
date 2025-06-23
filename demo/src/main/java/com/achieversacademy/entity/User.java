package com.achieversacademy.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String fullName;
    
    private String phone;
    private String email;
    
    @Column(nullable = false)
    private String role;
    
    @Column(name = "approved")
    private boolean approved = false;
    
    @Column(name = "status")
    private String status = "PENDING";
    
    public User() {}
    
    public User(String username, String password, String fullName, String phone, String role) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.phone = phone;
        this.role = role;
        this.approved = false;
        this.status = "PENDING";
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public boolean isApproved() {
        return approved;
    }
    
    public void setApproved(boolean approved) {
        this.approved = approved;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    // equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return approved == user.approved &&
               Objects.equals(id, user.id) &&
               Objects.equals(username, user.username) &&
               Objects.equals(fullName, user.fullName) &&
               Objects.equals(phone, user.phone) &&
               Objects.equals(email, user.email) &&
               Objects.equals(role, user.role) &&
               Objects.equals(status, user.status);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, username, fullName, phone, email, role, approved, status);
    }
    
    // toString
    @Override
    public String toString() {
        return "User{" +
               "id=" + id +
               ", username='" + username + '\'' +
               ", fullName='" + fullName + '\'' +
               ", phone='" + phone + '\'' +
               ", email='" + email + '\'' +
               ", role='" + role + '\'' +
               ", approved=" + approved +
               ", status='" + status + '\'' +
               '}';
    }
}