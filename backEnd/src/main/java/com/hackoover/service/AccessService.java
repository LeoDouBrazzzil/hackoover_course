package com.hackoover.service;

import com.hackoover.dto.AccessResponse;

import java.util.UUID;

public interface AccessService {
    AccessResponse getStatus(String email);
    void subscribe(String email);
    void purchaseCourse(String email, UUID courseId);
}
