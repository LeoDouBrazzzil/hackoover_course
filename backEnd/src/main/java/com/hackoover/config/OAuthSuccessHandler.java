
package com.hackoover.config;

import com.hackoover.model.User;
import com.hackoover.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {


        @Autowired
        UserRepository userRepository;

        @Override
        public void onAuthenticationSuccess(HttpServletRequest request,
                                            HttpServletResponse response,
                                            Authentication authentication) throws IOException {

            OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

            String email = oauthUser.getAttribute("email");
            String firstName = oauthUser.getAttribute("firstName");
            String lastName = oauthUser.getAttribute("lastName");

            User user = userRepository.findByEmail(email)
                    .orElseGet(() -> {

                        User u = new User();
                        u.setEmail(email);
                        u.setFirstName(firstName);
                        u.setFirstName(lastName);

                        return userRepository.save(u);

                    });

            String token = JwtUtil.generateToken(user.getEmail(), user.getRoles());

            response.sendRedirect("http://localhost:3000/oauth-success?token="+token);

        }
    }