package com.hackoover.service;

public interface EmailService {

    void sendVerificationEmail(String to, String username, String token);
}
