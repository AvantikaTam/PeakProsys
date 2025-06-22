package com.achieversacademy.service;
// UserService.java


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
        return userRepository.save(user);
    }

    public List<User> getPendingApprovals(String role) {
        return userRepository.findByRoleAndApproved(role, false);
    }

    public User approveUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setApproved(true);
            return userRepository.save(user);
        }
        return null;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}