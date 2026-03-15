package com.hackoover.controller;

import com.hackoover.dto.AuthResponse;
import com.hackoover.dto.LoginRequest;
import com.hackoover.dto.RegisterRequest;
import com.hackoover.dto.UpdateProfileRequest;
import com.hackoover.dto.UserDTO;
import com.hackoover.model.User;
import com.hackoover.repository.UserRepository;
import com.hackoover.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        // Si un message d'erreur est présent, retourner BAD_REQUEST
        if (response.getMessage() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);

        // Si un message d'erreur est présent, retourner UNAUTHORIZED
        if (response.getMessage() != null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {

        String result = authService.verifyEmail(token);

        if (result.contains("successfully")) {
            return ResponseEntity.ok(result);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatarUrl(user.getAvatarUrl())
                .emailVerified(user.getEmailVerified())
                .isPremium(user.getIsPremium())
                .roles(user.getRoles())
                .createdAt(user.getCreatedAt())
                .build();

        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication
    ) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName()  != null) user.setLastName(request.getLastName());
        if (request.getUsername()  != null && !request.getUsername().isBlank()) {
            // Check uniqueness only if username changed
            if (!request.getUsername().equals(user.getUsername())) {
                if (userRepository.existsByUsername(request.getUsername())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                }
                user.setUsername(request.getUsername());
            }
        }

        User saved = userRepository.save(user);

        UserDTO userDTO = UserDTO.builder()
                .id(saved.getId())
                .username(saved.getUsername())
                .email(saved.getEmail())
                .firstName(saved.getFirstName())
                .lastName(saved.getLastName())
                .avatarUrl(saved.getAvatarUrl())
                .emailVerified(saved.getEmailVerified())
                .isPremium(saved.getIsPremium())
                .roles(saved.getRoles())
                .createdAt(saved.getCreatedAt())
                .build();

        return ResponseEntity.ok(userDTO);
    }
}
