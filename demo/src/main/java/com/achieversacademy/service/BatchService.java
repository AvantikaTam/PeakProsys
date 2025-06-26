package com.achieversacademy.service;

import com.achieversacademy.entity.Batch;
import com.achieversacademy.entity.Role;
import com.achieversacademy.entity.User;
import com.achieversacademy.repository.BatchRepository;
import com.achieversacademy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class BatchService {

    private final BatchRepository batchRepository;
    private final UserRepository userRepository;

    @Autowired
    public BatchService(BatchRepository batchRepository, UserRepository userRepository) {
        this.batchRepository = batchRepository;
        this.userRepository = userRepository;
    }

    public Batch createBatch(String name, String description, User createdByAdmin) {
        Batch batch = new Batch();
        batch.setName(name);
        batch.setDescription(description);
        batch.setCreatedByAdmin(createdByAdmin);
        batch.setCreatedAt(LocalDateTime.now());
        return batchRepository.save(batch);
    }

    public Batch updateBatch(Long batchId, String name, String description) {
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));
        batch.setName(name);
        batch.setDescription(description);
        return batchRepository.save(batch);
    }

    public void deleteBatch(Long batchId) {
        batchRepository.deleteById(batchId);
    }

    public List<Batch> searchBatches(String name) {
        return batchRepository.findByNameContainingIgnoreCase(name);
    }

    public Batch assignStudentsToBatch(Long batchId, Set<Long> studentIds) {
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));
        
        Set<User> students = batch.getStudents();
        for (Long studentId : studentIds) {
            User student = userRepository.findById(studentId)
                    .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
            if (student.getRole() != Role.STUDENT) {
                throw new RuntimeException("User with ID " + studentId + " is not a student");
            }
            students.add(student);
        }
        
        return batchRepository.save(batch);
    }

    public Batch assignTutorsToBatch(Long batchId, Set<Long> tutorIds) {
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));
        
        Set<User> tutors = batch.getTutors();
        for (Long tutorId : tutorIds) {
            User tutor = userRepository.findById(tutorId)
                    .orElseThrow(() -> new RuntimeException("Tutor not found with ID: " + tutorId));
            if (tutor.getRole() != Role.TUTOR) {
                throw new RuntimeException("User with ID " + tutorId + " is not a tutor");
            }
            tutors.add(tutor);
        }
        
        return batchRepository.save(batch);
    }

    public List<User> getStudentsInBatch(Long batchId) {
        return batchRepository.findStudentsByBatchId(batchId);
    }

    public List<User> getTutorsInBatch(Long batchId) {
        return batchRepository.findTutorsByBatchId(batchId);
    }

    public List<Batch> getBatchesForStudent(Long studentId) {
        return batchRepository.findByStudentId(studentId);
    }

    public List<Batch> getBatchesForTutor(Long tutorId) {
        return batchRepository.findByTutorId(tutorId);
    }
}