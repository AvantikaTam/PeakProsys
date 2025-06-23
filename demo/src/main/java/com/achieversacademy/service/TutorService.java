package com.achieversacademy.service;

import com.achieversacademy.entity.Tutor;
import com.achieversacademy.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TutorService {
    
    @Autowired
    private TutorRepository tutorRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public Tutor saveTutor(Tutor tutor) {
        // Encode password before saving
        tutor.setPassword(passwordEncoder.encode(tutor.getPassword()));
        tutor.setStatus("PENDING");
        tutor.setApproved(false);
        return tutorRepository.save(tutor);
    }
    
    public List<Tutor> getApprovedTutors() {
        return tutorRepository.findByApproved(true);
    }
    
    public List<Tutor> getPendingTutors() {
        return tutorRepository.findByApproved(false);
    }
    
    public Tutor approveTutor(Long tutorId) {
        Tutor tutor = tutorRepository.findById(tutorId).orElse(null);
        if (tutor != null) {
            tutor.setApproved(true);
            tutor.setStatus("APPROVED");
            return tutorRepository.save(tutor);
        }
        return null;
    }
    
    public Tutor findById(Long id) {
        return tutorRepository.findById(id).orElse(null);
    }
    
    public List<Tutor> getAllTutors() {
        return tutorRepository.findAll();
    }
    
    public void deleteTutor(Long id) {
        tutorRepository.deleteById(id);
    }
}