package com.achieversacademy.entity;

// User.java

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String phone;
    
    @Column(nullable = false)
    private String role; // STUDENT, TUTOR, ADMIN
    
    @Column(nullable = false)
    private boolean approved = false;
    
    private String address;
    private String email;

    // Constructors
    public User() {}

    public User(String username, String password, String name, String phone, String role) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.role = role;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
               Objects.equals(password, user.password) && 
               Objects.equals(name, user.name) && 
               Objects.equals(phone, user.phone) && 
               Objects.equals(role, user.role) && 
               Objects.equals(address, user.address) && 
               Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, name, phone, role, approved, address, email);
    }

    // toString
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='[PROTECTED]'" +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", role='" + role + '\'' +
                ", approved=" + approved +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}