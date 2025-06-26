package com.achieversacademy.service;

import com.achieversacademy.entity.Role;
import com.achieversacademy.entity.User;
import com.achieversacademy.entity.UserStatus;
import com.achieversacademy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus(UserStatus.PENDING);
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public List<User> getPendingUsers(Role role) {
        return userRepository.findPendingUsersByRole(role);
    }

    public void approveUser(Long userId, User admin) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(UserStatus.APPROVED);
            user.setApprovedByAdmin(admin);
            user.setApprovedAt(LocalDateTime.now());
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void rejectUser(Long userId, User admin) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(UserStatus.REJECTED);
            user.setApprovedByAdmin(admin);
            user.setApprovedAt(LocalDateTime.now());
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public List<User> getAllUsersByRoleAndStatus(Role role, UserStatus status) {
        return userRepository.findByRoleAndStatus(role, status);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}