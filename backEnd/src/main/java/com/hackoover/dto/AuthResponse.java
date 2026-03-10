package com.hackoover.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private String type = "Bearer";
    private UUID userId;
    private String username;
    private String email;
    private Set<String> roles;
    private String message;

    public AuthResponse(String token, UUID userId, String username, String email, Set<String> roles) {
        this.token = token;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}
