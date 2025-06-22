package com.achieversacademy.repository;

// UserRepository.java


import com.achieversacademy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    List<User> findByRoleAndApproved(String role, boolean approved);
}