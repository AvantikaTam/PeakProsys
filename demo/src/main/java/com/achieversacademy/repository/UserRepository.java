package com.achieversacademy.repository;

import com.achieversacademy.entity.Role;
import com.achieversacademy.entity.User;
import com.achieversacademy.entity.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    
    List<User> findByRoleAndStatus(Role role, UserStatus status);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.status = 'PENDING'")
    List<User> findPendingUsersByRole(@Param("role") Role role);
    
    @Modifying
    @Query("UPDATE User u SET u.status = :status, u.approvedAt = CURRENT_TIMESTAMP, u.approvedByAdmin = :admin WHERE u.id = :userId")
    void updateUserStatus(@Param("userId") Long userId, @Param("status") UserStatus status, @Param("admin") User admin);
    
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}