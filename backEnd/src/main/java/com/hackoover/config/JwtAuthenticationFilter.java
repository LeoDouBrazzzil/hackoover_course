package com.hackoover.config;

import com.hackoover.model.User;
import com.hackoover.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.stream.Collectors;

/**
 * Filtre simple pour authentifier les requêtes avec JWT
 * 1. Extrait le token du header Authorization
 * 2. Valide le token et récupère l'email
 * 3. Charge l'utilisateur et le met dans le SecurityContext
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Récupérer le header Authorization
        String authHeader = request.getHeader("Authorization");

        // 2. Vérifier si le header contient un token Bearer
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // 3. Extraire le token (enlever "Bearer ")
            String token = authHeader.substring(7);

            // 4. Extraire l'email du token
            String email = JwtUtil.extractEmail(token);

            // 5. Charger l'utilisateur depuis la base
            User user = userRepository.findByEmail(email).orElse(null);

            if (user != null) {
                // 6. Créer les autorités (rôles)
                var authorities = user.getRoles().stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                // 7. Créer l'authentification
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(email, null, authorities);

                // 8. Mettre l'authentification dans le contexte Spring Security
                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        } catch (Exception e) {
            // Token invalide ou expiré, on continue sans authentification
            System.err.println("JWT error: " + e.getMessage());
        }

        // 9. Continuer la chaîne de filtres
        filterChain.doFilter(request, response);
    }
}
