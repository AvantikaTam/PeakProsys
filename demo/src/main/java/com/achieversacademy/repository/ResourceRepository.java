package com.achieversacademy.repository;

import com.achieversacademy.entity.Batch;
import com.achieversacademy.entity.Resource;
import com.achieversacademy.entity.ResourceType;
import com.achieversacademy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    
    List<Resource> findByBatchAndIsActive(Batch batch, Boolean isActive);
    
    List<Resource> findByBatchAndResourceTypeAndIsActive(Batch batch, ResourceType resourceType, Boolean isActive);
    
    List<Resource> findByTutorAndIsActive(User tutor, Boolean isActive);
    
    @Query("SELECT r FROM Resource r WHERE r.batch.id = :batchId AND r.isActive = true ORDER BY r.uploadedAt DESC")
    List<Resource> findActiveResourcesByBatch(@Param("batchId") Long batchId);
    
    @Query("SELECT r FROM Resource r WHERE r.batch.id = :batchId AND r.resourceType = :type AND r.isActive = true ORDER BY r.uploadedAt DESC")
    List<Resource> findActiveResourcesByBatchAndType(@Param("batchId") Long batchId, @Param("type") ResourceType type);
    
    @Modifying
    @Query("UPDATE Resource r SET r.isActive = :status WHERE r.id = :resourceId")
    void updateResourceStatus(@Param("resourceId") Long resourceId, @Param("status") Boolean status);
}