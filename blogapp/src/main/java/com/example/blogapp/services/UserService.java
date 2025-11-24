package com.example.blogapp.services;

import com.example.blogapp.domain.entities.User;

import java.util.UUID;

public interface UserService {
    User getUserById(UUID id);
}
