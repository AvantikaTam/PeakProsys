package com.achieversacademy.service;

// TutorService.java


import com.achieversacademy.entity.Tutor;
import com.achieversacademy.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TutorService {
    @Autowired
    private TutorRepository tutorRepository;

    public List<Tutor> getAllTutors() {
        return tutorRepository.findAll();
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
            return tutorRepository.save(tutor);
        }
        return null;
    }

    public Tutor saveTutor(Tutor tutor) {
        return tutorRepository.save(tutor);
    }
}