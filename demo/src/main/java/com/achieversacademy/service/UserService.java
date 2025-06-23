// UserService.java
package com.achieversacademy.service;

import com.achieversacademy.entity.User;
import com.achieversacademy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus("PENDING"); // Set default status as PENDING
        return userRepository.save(user);
    }
    
    public List<User> getPendingApprovals(String role) {
        return userRepository.findByRoleAndApproved(role, false);
    }
    
    public User approveUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setApproved(true);
            user.setStatus("APPROVED"); // Update status when approved
            return userRepository.save(user);
        }
        return null;
    }
    
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            // Check if the raw password matches the encoded password
            if (passwordEncoder.matches(password, user.getPassword())) {
                // Additional check: only allow approved users to login (except ADMIN)
                if ("ADMIN".equals(user.getRole()) || user.isApproved()) {
                    return user;
                }
            }
        }
        return null; // Authentication failed
    }
}