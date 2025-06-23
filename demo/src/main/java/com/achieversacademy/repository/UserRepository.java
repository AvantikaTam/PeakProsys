package com.achieversacademy.repository;

import com.achieversacademy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    List<User> findByRoleAndApproved(String role, boolean approved);
    List<User> findByApproved(boolean approved);
    List<User> findByStatus(String status);
}