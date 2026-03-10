package com.hackoover.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email"),
                @UniqueConstraint(columnNames = "username")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    // -------------------------------------------------
    // IDENTIFIANT
    // -------------------------------------------------
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // -------------------------------------------------
    // INFORMATIONS DE COMPTE
    // -------------------------------------------------
    @NotBlank
    @Size(min = 3, max = 30)
    @Column(nullable = false)
    private String username;

    @Email
    @NotBlank
    @Column(nullable = false)
    private String email;

    @NotBlank
    @Size(min = 8)
    @Column(nullable = false)
    private String password;

    // -------------------------------------------------
    // PROFIL UTILISATEUR
    // -------------------------------------------------
    private String firstName;

    private String lastName;

    private String avatarUrl;

    private String country;

    private String city;

    private Boolean emailVerified = false;

    // -------------------------------------------------
    // ROLES / PERMISSIONS
    // -------------------------------------------------
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles = new HashSet<>();

    // -------------------------------------------------
    // PARAMÈTRES DU COMPTE
    // -------------------------------------------------
    private Boolean active = true;

    private Boolean isPremium = false;

    private LocalDateTime premiumUntil;

    // -------------------------------------------------
    // DATES AUTOMATIQUES
    // -------------------------------------------------
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // -------------------------------------------------
    // RELATIONS POSSIBLES
    // -------------------------------------------------

    // Un utilisateur progresse dans plusieurs leçons
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserProgress> progress = new ArrayList<>();

    // Exemple d'autres relations si tu veux les utiliser
    /*
    @OneToMany(mappedBy = "author")
    private List<Course> coursesCreated = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "user_bookmarks",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> bookmarks = new ArrayList<>();
    */
}
