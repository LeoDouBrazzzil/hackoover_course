package com.hackoover.service;

import com.hackoover.dto.AccessResponse;
import com.hackoover.model.Course;
import com.hackoover.model.CoursePurchase;
import com.hackoover.model.User;
import com.hackoover.repository.CoursePurchaseRepository;
import com.hackoover.repository.CourseRepository;
import com.hackoover.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AccessServiceImpl implements AccessService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final CoursePurchaseRepository coursePurchaseRepository;

    public AccessServiceImpl(UserRepository userRepository,
                             CourseRepository courseRepository,
                             CoursePurchaseRepository coursePurchaseRepository) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.coursePurchaseRepository = coursePurchaseRepository;
    }

    @Override
    public AccessResponse getStatus(String email) {
        User user = findUser(email);

        boolean hasSubscription = Boolean.TRUE.equals(user.getIsPremium())
                && user.getPremiumUntil() != null
                && user.getPremiumUntil().isAfter(LocalDateTime.now());

        List<String> purchasedIds = coursePurchaseRepository
                .findCourseIdsByUserId(user.getId())
                .stream()
                .map(UUID::toString)
                .toList();

        return new AccessResponse(hasSubscription, purchasedIds);
    }

    @Override
    @Transactional
    public void subscribe(String email) {
        User user = findUser(email);
        user.setIsPremium(true);
        user.setPremiumUntil(LocalDateTime.now().plusMonths(1));
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void purchaseCourse(String email, UUID courseId) {
        User user = findUser(email);

        if (coursePurchaseRepository.existsByUserIdAndCourseId(user.getId(), courseId)) {
            return; // déjà acheté
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        CoursePurchase purchase = new CoursePurchase();
        purchase.setUser(user);
        purchase.setCourse(course);
        purchase.setAmount(4.99);
        coursePurchaseRepository.save(purchase);
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .or(() -> userRepository.findByUsername(email))
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
    }
}
