package com.example.blogapp.services.impl;

import com.example.blogapp.domain.entities.User;
import com.example.blogapp.repositories.UserRepository;
import com.example.blogapp.services.UserService;
import com.example.blogapp.repositories.UserRepository;
import com.example.blogapp.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getUserById(UUID id) {
        return userRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

}
