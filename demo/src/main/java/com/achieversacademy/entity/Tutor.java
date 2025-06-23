package com.achieversacademy.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tutors")
public class Tutor extends User {
    
    private String subject;
    private int experienceYears;
    private String qualification;
    private int studentsCount;
    
    // Add status field if not inherited from User
    @Column(name = "status")
    private String status = "PENDING";
    
    public Tutor() {}
    
    public Tutor(String username, String password, String name, String phone, String subject) {
        super(username, password, name, phone, "TUTOR");
        this.subject = subject;
        this.status = "PENDING";
    }
    
    // Getters and Setters
    public String getSubject() {
        return subject;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }
    
    public int getExperienceYears() {
        return experienceYears;
    }
    
    public void setExperienceYears(int experienceYears) {
        this.experienceYears = experienceYears;
    }
    
    public String getQualification() {
        return qualification;
    }
    
    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
    
    public int getStudentsCount() {
        return studentsCount;
    }
    
    public void setStudentsCount(int studentsCount) {
        this.studentsCount = studentsCount;
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
        Tutor tutor = (Tutor) o;
        return experienceYears == tutor.experienceYears &&
               studentsCount == tutor.studentsCount &&
               Objects.equals(subject, tutor.subject) &&
               Objects.equals(qualification, tutor.qualification) &&
               Objects.equals(status, tutor.status);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), subject, experienceYears, qualification, studentsCount, status);
    }
    
    // toString
    @Override
    public String toString() {
        return "Tutor{" +
               "subject='" + subject + '\'' +
               ", experienceYears=" + experienceYears +
               ", qualification='" + qualification + '\'' +
               ", studentsCount=" + studentsCount +
               ", status='" + status + '\'' +
               "} " + super.toString();
    }
}