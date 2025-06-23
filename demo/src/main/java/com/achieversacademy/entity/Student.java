package com.achieversacademy.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "students")
public class Student extends User {
    
    private String className;
    private String parentName;
    private String parentContact;
    
    // Add status field if not inherited from User
    @Column(name = "status")
    private String status = "PENDING";
    
    public Student() {}
    
    public Student(String username, String password, String name, String phone, String className) {
        super(username, password, name, phone, "STUDENT");
        this.className = className;
        this.status = "PENDING";
    }
    
    // Getters and Setters
    public String getClassName() {
        return className;
    }
    
    public void setClassName(String className) {
        this.className = className;
    }
    
    public String getParentName() {
        return parentName;
    }
    
    public void setParentName(String parentName) {
        this.parentName = parentName;
    }
    
    public String getParentContact() {
        return parentContact;
    }
    
    public void setParentContact(String parentContact) {
        this.parentContact = parentContact;
    }
    
    // Status getter and setter
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
        if (!super.equals(o)) return false;
        Student student = (Student) o;
        return Objects.equals(className, student.className) &&
               Objects.equals(parentName, student.parentName) &&
               Objects.equals(parentContact, student.parentContact) &&
               Objects.equals(status, student.status);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), className, parentName, parentContact, status);
    }
    
    // toString
    @Override
    public String toString() {
        return "Student{" +
               "className='" + className + '\'' +
               ", parentName='" + parentName + '\'' +
               ", parentContact='" + parentContact + '\'' +
               ", status='" + status + '\'' +
               "} " + super.toString();
    }
}