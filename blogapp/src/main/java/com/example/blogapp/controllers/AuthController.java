package com.example.blogapp.controllers;

import com.example.blogapp.domain.dtos.AuthResponse;
import com.example.blogapp.domain.dtos.LoginRequest;
import com.example.blogapp.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    private ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest){
        UserDetails userdetails=authenticationService.authenticate(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        String token= authenticationService.generateToken(userdetails);
        AuthResponse auth=AuthResponse.builder()
                .token(token)
                .expiresIn(86400)
                .build();
        return ResponseEntity.ok(auth);
    }
}
