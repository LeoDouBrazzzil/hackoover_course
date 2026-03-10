package com.hackoover.controller;

import com.hackoover.dto.AuthResponse;
import com.hackoover.dto.LoginRequest;
import com.hackoover.dto.RegisterRequest;
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
                .build();

        return ResponseEntity.ok(userDTO);
    }
}
