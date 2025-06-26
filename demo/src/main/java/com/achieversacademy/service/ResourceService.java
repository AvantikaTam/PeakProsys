package com.achieversacademy.service;

import com.achieversacademy.entity.Batch;
import com.achieversacademy.entity.Resource;
import com.achieversacademy.entity.ResourceType;
import com.achieversacademy.entity.User;
import com.achieversacademy.repository.BatchRepository;
import com.achieversacademy.repository.ResourceRepository;
import com.achieversacademy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ResourceService {

    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;
    private final BatchRepository batchRepository;
    private final String UPLOAD_DIR = "uploads/";

    @Autowired
    public ResourceService(ResourceRepository resourceRepository, 
                          UserRepository userRepository, 
                          BatchRepository batchRepository) {
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
        this.batchRepository = batchRepository;
        
        // Create upload directory if it doesn't exist
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }
    }

    public Resource uploadResource(Long tutorId, Long batchId, String title, String description,
                                 ResourceType resourceType, MultipartFile file) throws IOException {
        User tutor = userRepository.findById(tutorId)
                .orElseThrow(() -> new RuntimeException("Tutor not found"));
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        // Check if tutor is assigned to this batch
        if (!batch.getTutors().contains(tutor)) {
            throw new RuntimeException("Tutor is not assigned to this batch");
        }

        // Save file to disk
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.copy(file.getInputStream(), filePath);

        Resource resource = new Resource();
        resource.setTitle(title);
        resource.setDescription(description);
        resource.setFileName(fileName);
        resource.setFilePath(filePath.toString());
        resource.setFileSize(file.getSize());
        resource.setResourceType(resourceType);
        resource.setTutor(tutor);
        resource.setBatch(batch);
        resource.setUploadedAt(LocalDateTime.now());
        resource.setIsActive(true);

        return resourceRepository.save(resource);
    }

    public void deactivateResource(Long resourceId) {
        resourceRepository.updateResourceStatus(resourceId, false);
    }

    public void activateResource(Long resourceId) {
        resourceRepository.updateResourceStatus(resourceId, true);
    }

    public List<Resource> getActiveResourcesForBatch(Long batchId) {
        return resourceRepository.findActiveResourcesByBatch(batchId);
    }

    public List<Resource> getActiveResourcesForBatchByType(Long batchId, ResourceType type) {
        return resourceRepository.findActiveResourcesByBatchAndType(batchId, type);
    }

    public List<Resource> getResourcesUploadedByTutor(Long tutorId) {
        User tutor = userRepository.findById(tutorId)
                .orElseThrow(() -> new RuntimeException("Tutor not found"));
        return resourceRepository.findByTutorAndIsActive(tutor, true);
    }
}