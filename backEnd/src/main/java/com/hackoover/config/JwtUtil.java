package com.hackoover.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Set;

/**
 * Utilitaire simple pour gérer les JWT
 * - generateToken: crée un token avec l'email de l'utilisateur
 * - extractEmail: récupère l'email depuis un token
 */
public class JwtUtil {

    private JwtUtil() {}

    // Clé secrète de 256 bits (en production, utiliser variable d'environnement)
    private static final String SECRET = "hackoover-super-secret-key-minimum-256-bits-required-for-hs256";
    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    private static final long EXPIRATION = 24 * 60 * 60 * 1000; // 24 heures

    /**
     * Génère un token JWT pour un email
     */
    public static String generateToken(String email, Set<String> roles) {
        return Jwts.builder()
                .setSubject(email)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extrait l'email depuis un token JWT
     * Lance une exception si le token est invalide/expiré
     */
    public static String extractEmail(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}