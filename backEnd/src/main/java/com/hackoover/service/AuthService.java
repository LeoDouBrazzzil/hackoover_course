package com.hackoover.service;

import com.hackoover.dto.AuthResponse;
import com.hackoover.dto.LoginRequest;
import com.hackoover.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    String verifyEmail(String token);
}
