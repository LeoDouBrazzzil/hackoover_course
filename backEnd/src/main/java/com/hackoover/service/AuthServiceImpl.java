package com.hackoover.service;

import com.hackoover.config.JwtUtil;
import com.hackoover.dto.AuthResponse;
import com.hackoover.dto.LoginRequest;
import com.hackoover.dto.RegisterRequest;
import com.hackoover.model.EmailVerificationToken;
import com.hackoover.model.User;
import com.hackoover.repository.EmailVerificationTokenRepository;
import com.hackoover.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailVerificationTokenRepository tokenRepository;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {

        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(request.getEmail())) {
            return AuthResponse.builder()
                    .message("Email already exists")
                    .build();
        }

        // Vérifier si le username existe déjà
        if (userRepository.existsByUsername(request.getUsername())) {
            return AuthResponse.builder()
                    .message("Username already exists")
                    .build();
        }

        // Créer le nouvel utilisateur
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .roles(roles)
                .active(true)
                .isPremium(false)
                .emailVerified(false)
                .build();

        User savedUser = userRepository.save(user);

        // Créer le token de vérification email
        String verificationToken = UUID.randomUUID().toString();
        EmailVerificationToken emailToken = EmailVerificationToken.builder()
                .token(verificationToken)
                .user(savedUser)
                .expiresAt(LocalDateTime.now().plusHours(24))
                .build();
        tokenRepository.save(emailToken);

        // Envoyer l'email de confirmation
        try {
            emailService.sendVerificationEmail(
                    savedUser.getEmail(),
                    savedUser.getUsername(),
                    verificationToken
            );
        } catch (Exception e) {
            // Log l'erreur mais ne bloquez pas l'inscription
            System.err.println("Failed to send verification email: " + e.getMessage());
        }

        // Générer le token JWT
        String token = JwtUtil.generateToken(savedUser.getEmail());

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRoles()
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        // Chercher l'utilisateur par email ou username
        User user = userRepository.findByEmail(request.getEmailOrUsername())
                .or(() -> userRepository.findByUsername(request.getEmailOrUsername()))
                .orElse(null);

        if (user == null) {
            return AuthResponse.builder()
                    .message("Invalid credentials")
                    .build();
        }

        // Vérifier le mot de passe
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return AuthResponse.builder()
                    .message("Invalid credentials")
                    .build();
        }

        // Vérifier si le compte est actif
        if (!user.getActive()) {
            return AuthResponse.builder()
                    .message("Account is deactivated")
                    .build();
        }

        // Générer le token JWT
        String token = JwtUtil.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles()
        );
    }

    @Override
    @Transactional
    public String verifyEmail(String token) {

        EmailVerificationToken verificationToken = tokenRepository.findByToken(token)
                .orElse(null);

        if (verificationToken == null) {
            return "Invalid verification token";
        }

        if (verificationToken.isVerified()) {
            return "Email already verified";
        }

        if (verificationToken.isExpired()) {
            return "Verification token has expired";
        }

        // Marquer le token comme vérifié
        verificationToken.setVerifiedAt(LocalDateTime.now());
        tokenRepository.save(verificationToken);

        // Marquer l'email comme vérifié
        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);

        return "Email verified successfully";
    }
}
